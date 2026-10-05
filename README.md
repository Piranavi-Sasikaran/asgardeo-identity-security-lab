# Asgardeo Identity Security Lab

A hands-on identity and access management (IAM) project built using **WSO2 Asgardeo** and **React**.

The project demonstrates secure authentication, OpenID Connect (OIDC), protected routes, identity claims, role-based access control (RBAC), and multi-factor authentication (MFA).

## Security Features

- Authentication using WSO2 Asgardeo
- OAuth 2.0 Authorization Code Flow with PKCE
- OpenID Connect (OIDC)
- Protected application routes
- User identity claims
- Role-Based Access Control (RBAC)
- Security Analyst restricted resource
- TOTP Multi-Factor Authentication (MFA)
- Secure logout
- Redirect URI validation

## Architecture

```text
User
 │
 ▼
React SPA
 │
 │ OIDC Authorization Code + PKCE
 ▼
WSO2 Asgardeo
 │
 ├── Username & Password
 │
 ├── TOTP MFA
 │
 ├── Identity Claims
 │
 └── Security Analyst Role
 │
 ▼
React Application
 │
 ├── /dashboard
 │     Authenticated users
 │
 └── /analyst
       Security Analyst role required
```

## Access Control

The application contains two protected resources.

### `/dashboard`

Requires the user to be authenticated.

### `/analyst`

Requires:

1. Successful authentication
2. `Security Analyst` role

This demonstrates the difference between **authentication** and **authorization**.

## Identity Claims

The application requests selected OIDC scopes:

```text
openid
profile
email
roles
```

The application can use the returned claims to identify the authenticated user and make authorization decisions.

## Multi-Factor Authentication

Authentication is configured with two steps:

```text
Username + Password
        ↓
TOTP
        ↓
Application Access
```

TOTP provides an additional authentication factor before the user is granted access.

## Security Tests

| Test Case | Expected Result | Result |
|---|---|---|
| Unauthenticated access to `/dashboard` | Access denied | Pass |
| Valid Asgardeo authentication | Authentication succeeds | Pass |
| Retrieve permitted identity claims | Selected claims returned | Pass |
| Security Analyst accesses `/analyst` | Access granted | Pass |
| Authenticated user without Security Analyst role accesses `/analyst` | Access denied | Pass |
| Unregistered redirect URI | Authentication callback rejected | Pass |
| Password + TOTP authentication | Both authentication steps required | Pass |

## Technologies

- WSO2 Asgardeo
- React
- Vite
- Asgardeo React SDK
- React Router
- OAuth 2.0
- OpenID Connect
- PKCE
- TOTP

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The development application runs at:

```text
http://localhost:5173/
```

The corresponding redirect URI and allowed origin must also be configured in the Asgardeo application.

## Security Notes

- No client secret is stored in the SPA.
- Sensitive credentials should never be committed to this repository.
- TOTP secrets, passwords, access tokens, ID tokens, and refresh tokens must not be included in screenshots or source control.
- Only required identity scopes should be requested.

## Learning Outcomes

Through this project I gained practical experience with:

- Identity and Access Management
- OAuth 2.0 and OpenID Connect
- Authorization Code Flow with PKCE
- Authentication vs. authorization
- Role-Based Access Control
- Identity claims and scopes
- Multi-Factor Authentication
- Redirect URI security
- Frontend route protection