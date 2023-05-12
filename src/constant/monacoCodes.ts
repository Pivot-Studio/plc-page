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
  {
    title: 'generic',
    code: `use core::panic;
pub struct GenericType<S|T> {
    x: S;
    y: *T;
}

pub struct GenericOutter<S> {
    x: GenericInner<S>;
}

pub struct GenericInner<T> {
    x: T;
}

pub struct One<T> {
    a: T;
}

pub struct Two<T> {
    b: One<T>;
}

pub struct Three<S> {
    c: Two<S>;
}

pub struct GenericSelfRef<T|S> {
    x: *GenericSelfRef<T|S>;
}

pub fn ret_generic1<T>() Three<T> {
    return Three<T>{};
}

pub fn ret_generic2<T>(x: T) Three<T> {
    let two = Two{
        b: One{
            a: x
        }
    };
    return Three{
        c: two
    };
}

pub fn get_field<T>(x: Three<T>) T {
    return x.c.b.a;
}

pub fn generic<T>(x: T) T {
    let y = x;
    return y;
}

pub fn simple<T>(x: i64) i64 {
    if x == 0 {
        return 0;
    }
    if x == 1 {
        return 1;
    }
    if x == 2 {
        return 1;
    }
    return simple<T>(x - 1) + simple<T>(x - 2);
}

pub fn complex<A|B|C>(a: i64, x: A, y: B, z: C) i64 {
    if a == 0 {
        return 0;
    }
    if a == 1 {
        return 1;
    }
    if a == 2 {
        return 1;
    }
    return complex<B|_|C>(a - 1, y, x, z) + complex<C|A|_>(a - 2, z, x, y);
}

pub fn test_generic_simple() void {
    let x = generic(114514);
    let y = generic(true);
    panic::assert(y);
    panic::assert(x == 114514);
    let t = true;
    let a = GenericType{
        x: 999,
        y: &t
    };
    let b = GenericType{
        x: 888,
        y: &a
    };
    panic::assert(*b.y.y);
    panic::assert(b.y.x == 999);
    let g = GenericOutter{
        x: GenericInner{
            x: 998
        }
    };
    panic::assert(g.x.x == 998);
    let half_infer = GenericType<i64|_>{
        x: 999,
        y: &a
    };
    panic::assert(half_infer.x == 999);
    return;
}

pub fn test_generic_same_name() void {
    let t = Three{
        c: Two{
            b: One{
                a: 9999
            }
        }
    };
    let b = Three<bool>{};
    b.c.b.a = true;
    panic::assert(b.c.b.a);
    panic::assert(t.c.b.a == 9999);
    panic::assert(get_field(t) == 9999);
    return;
}

pub fn test_ret_generic() void {
    let x = ret_generic1<i64>();
    let y = ret_generic2(true);
    let z = ret_generic2([1, 2, 3]);
    let i = ret_generic2(&z);
    x.c.b.a = 999;
    panic::assert(y.c.b.a);
    panic::assert(x.c.b.a == 999);
    panic::assert(get_field(z)[0] == 1);
    return;
}

pub fn test_self_ref_generic() void {
    let x = GenericSelfRef<i64|bool>{};
    return;
}

pub fn test_generic_fn() void {
    let res = simple<bool>(10);
    panic::assert(res == 55);
    res = complex(10, true, [1, 23], &res);
    panic::assert(res == 55);
    return;
}

pub fn test_generic() void {
    test_generic_simple();
    test_generic_same_name();
    test_ret_generic();
    test_self_ref_generic();
    test_generic_fn();
    return;
}

`,
  },
  {
    title: 'find islands',
    code: `use core::panic;
pub fn test_map() void {
    // count = 5
    // 1, 0, 1, 1, 1
    // 1, 1, 0, 1, 1
    // 1, 0, 0, 1, 1
    // 0, 1, 1, 0, 0
    // 1, 0, 0, 1, 1
    let mp = [[1, 0, 1, 1, 1], [1, 1, 0, 1, 1], [1, 0, 0, 1, 1], [0, 1, 1, 0, 0], [1, 0, 0, 1, 1]];
    panic::assert(count(mp) == 5);
    return;
}

pub fn count(mp: [[i64 * 5] * 5]) i64 {
    let res = 0;
    let w = 5;
    let h = 5;
    let dfs: (i64, i64) => void;
    dfs = (i, j) => {
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
];