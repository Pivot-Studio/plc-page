export const basicCode = [
  {
    title: 'hello world',
    code: `use std::io;
fn main() i64 {
    println!("hello world!");
    return 0;
}
`,
  },
  {
    title: 'fibonacci',
    code: `use std::io;
fn main() i64 {
    let result = getFibonacci(10);
    println!(result);
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
  {
    title: 'fixed point',
    code: `use core::panic;
pub fn main() i64 {
    let g = |f: |i64| => i64, x: i64| => i64 {
        if x == 0 {
            return 1;
        }
        return x * f(x - 1);
    };
    let fact = Y(g);
    for let x = 0; x < 10; x = x + 1 {
        panic::assert(fact(x) == fact_recursion(x));
    }
    return 0;
}

struct Func<A|F> {
    f: |Func<A|F>, A| => F;
}

impl<A|F> Func<A|F> {
    fn call(f: Func<A|F>, x: A) F {
        return self.f(f, x);
    }

}

fn Y<A|R>(g: ||A| => R, A| => R) |A| => R {
    return |x: A| => R {
        let in = |f: Func<A|R>, x: A| => R {
            return f.call(f, x);
        };
        let field = |f: Func<A|R>, x: A| => R {
            return g(|x: A| => R {
                return f.call(f, x);
            }, x);
        };
        let f = Func{
            f: field
        };
        return in(f, x);
    };
}

fn fact_recursion(x: i64) i64 {
    if x == 0 {
        return 1;
    }
    return x * fact_recursion(x - 1);
}

`,
  },
  {
    title: 'find islands',
    code: `use core::panic;
use std::io;
pub fn main() i64 {
    // count = 5
    // 1, 0, 1, 1, 1
    // 1, 1, 0, 1, 1
    // 1, 0, 0, 1, 1
    // 0, 1, 1, 0, 0
    // 1, 0, 0, 1, 1
    let mp = [[1, 0, 1, 1, 1], [1, 1, 0, 1, 1], [1, 0, 0, 1, 1], [0, 1, 1, 0, 0], [1, 0, 0, 1, 1]];
    let c = count(mp);
    panic::assert(c == 5);
    println!(c);
    return 0;
}

pub fn count(mp: [[i64]]) i64 {
    let res = 0;
    let w = 5;
    let h = 5;
    let dfs: |i64, i64| => void;
    dfs = |i, j| => {
        if i == -1 || i == h || j == -1 || j == w || mp[i][j] == 0 {
            return;
        }
        mp[i][j] = 0;
        dfs(i + 1, j);
        dfs(i, j + 1);
        dfs(i - 1, j);
        dfs(i, j - 1);
        return;
    };
    for let i = 0; i < h; i = i + 1 {
        for let j = 0; j < w; j = j + 1 {
            if mp[i][j] == 0 {
                continue;
            }
            res = res + 1;
            dfs(i, j);
        }
    }
    return res;
}
  
`,
  },
  {
    title:"hash table",
    code:`use std::cols::hashtable;
use core::panic::assert;
use core::hash::Hash;
use core::eq::*;

fn main() i64 {
    let table = hashtable::new_hash_table<string|string>(10 as u64, 1 as u64);
    table.insert("hello","world");
    table.insert("bye","bye");
    assert(table.get("hello") is string);
    let v = table.get("hello") as string!;
    assert("world".eq(&v));
    return 0;
}

`
  }
];
