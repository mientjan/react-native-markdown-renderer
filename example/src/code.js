const markdownText = `
Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
	return bar++;
};

console.log(foo(5));
\`\`\`
`;

export default markdownText;