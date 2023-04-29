export const basicCode = [
  {
    title: 'hello world',
    code: `use std::io;
fn main() i64 {
    io::print_s("hello world\\n");
    return 0;
}`,
  },
  {
    title: 'fibonacci',
    code: `use std::io;
fn main() i64 {
    io::printi64ln(getFibonacci(10));
    return 0;
}

fn getFibonacci(n: i64) i64 {
    let pre = 0;
    let nxt = 0;
    let result = 1;
    for let i = 0; i < n; i = i + 1 {
        result = result + pre;
        pre = nxt;
        nxt = result;
    }
    return result;
}
`,
  },
];
