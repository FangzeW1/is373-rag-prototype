# TaskNest Authentication

TaskNest later added user registration, login, a private member dashboard, and logout functionality.

Unauthenticated visitors must log in before accessing the member dashboard. Logging out invalidates the session. In one test, a copied session cookie was reused after logout, and the /api/me endpoint returned HTTP 401.

These tests demonstrate that the application enforces authentication on the server rather than relying solely on hiding interface elements.
