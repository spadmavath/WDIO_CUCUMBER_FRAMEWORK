Feature: Advance web interactionsss
Scenario Outline: web interactions
 Given login in to inventory web app
   When inventory page should list <noOfItems>
   Then validate all products have valid price
 Examples:
  | noOfItems |
  | 6         |