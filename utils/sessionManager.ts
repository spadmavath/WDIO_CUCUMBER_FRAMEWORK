import fs from 'fs';
import path from 'path'; // ✅ cross-platform, not 'path/win32'

export default class SessionManager {

    static sessionFile = path.join(process.cwd(), 'session.json');

    static sessionExists(): boolean {
        return fs.existsSync(this.sessionFile);
    }

    static async saveSession() {
        const cookies = await browser.getCookies();

        fs.writeFileSync(
            this.sessionFile,
            JSON.stringify(cookies, null, 2)
        );

        console.log('Session saved successfully');
    }

    static async restoreSession() {
        if (!this.sessionExists()) {
            throw new Error('No saved session found');
        }

        const cookies = JSON.parse(
            fs.readFileSync(this.sessionFile, 'utf-8')
        );

        // Navigate first before setting cookies (browser requirement)
        await browser.url('https://login.salesforce.com/');
        await browser.setCookies(cookies);
        await browser.refresh();

        // ✅ Wait for the page to fully load after restoring session
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return !url.includes('login.salesforce.com');
            },
            {
                timeout: 30000,
                timeoutMsg: 'Session restore failed — still on login page',
            }
        );

        console.log('Session restored successfully');
    }
}