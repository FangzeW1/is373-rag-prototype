# TaskNest Testing

TaskNest uses automated checks and manual browser observations to verify behavior.

The project has used formatting checks, static analysis, Python tests, and Chromium browser tests.

For the homepage, a narrow viewport approximately 390 pixels wide was tested to check for horizontal overflow.

For authentication, the application was tested by attempting to reuse a session cookie after logout. For authorization, role promotion and demotion were tested within the same logged-in session.

The project emphasizes predictions, observable evidence, and regression testing.
