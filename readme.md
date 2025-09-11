Apparently the Angular CLI only creates a 1 month certificate when it autogenerates a cert. I downloaded and used Micrsoft's SysInternals ProcessMonitor to find the fix.

    1. Stop ng serve --ssl if it's still running
    2. Delete node_modules\webpack-dev-server\ssl\server.pem
    3. Restart ng serve --ssl and you should have a new 30 day cert.
