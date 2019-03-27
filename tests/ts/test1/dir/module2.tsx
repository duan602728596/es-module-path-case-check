// @ts-ignore
import * as React from 'react';
import './Module1'; // err

// typescript
function f(a: string, b: number): string {
  return `${ a }${ b }`;
}

class Domo extends React.Component {
  render() {
    return (
      <div>Hello, world.</div>
    );
  }
}