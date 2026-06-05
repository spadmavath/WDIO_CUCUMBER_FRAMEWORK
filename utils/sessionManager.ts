import fs from 'fs';
import path from 'path/win32';

export default class SessionManager {

    static sessionFile = path.join(process.cwd(), 'session.json');

    static async saveSession() {

        const cookies = await browser.getCookies();

        fs.writeFileSync(
            this.sessionFile,
            JSON.stringify(cookies, null, 2)
        );

        console.log('Session saved successfully');
    }

    static async restoreSession() {

        if (fs.existsSync(this.sessionFile)) {

            const cookies = JSON.parse(
                fs.readFileSync(
                    this.sessionFile,
                    'utf-8'
                )
            );

            await browser.url(
                'https://login.salesforce.com/'
            );

            await browser.setCookies(cookies);

            await browser.refresh();

            console.log(
                'Session restored successfully'
            );
        }
        else {
            throw new Error(
                'No saved session found'
            );
        }
    }
}