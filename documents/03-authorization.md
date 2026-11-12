# TaskNest Authorization

TaskNest distinguishes between member and administrator roles.

Members cannot access the administrator page or protected administrator API. A direct request to the administrator API by a member should return HTTP 403.

Role changes can be performed through a terminal command. Testing in one active session showed that a member was denied access, promotion to administrator granted access, and demotion back to member removed access again.

Authorization must be enforced by the server. Hiding an administrator button is not sufficient protection.
