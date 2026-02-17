# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email the maintainer directly or use [GitHub's private vulnerability reporting](https://github.com/mientjan/react-native-markdown-renderer/security/advisories/new).

When reporting, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fixes (if applicable)

You can expect an initial response within 72 hours. We will work with you to understand and address the issue before any public disclosure.

## Security Considerations

This library renders markdown as native React Native components. A few things to be aware of:

- **Links**: The default `link` render rule opens URLs via React Native's `Linking` API. If you render untrusted markdown, consider providing a custom `link` rule that validates or sanitizes URLs before opening them.
- **Images**: The default `image` rule loads remote images via the `src` attribute. Consider validating image sources if rendering untrusted content.
- **HTML**: The `html_block` and `html_inline` rules render raw HTML content as plain text, not as actual HTML. This is safe by default.
- **Plugins**: Third-party markdown-it plugins may introduce additional attack surface. Vet plugins before use, especially with untrusted input.
