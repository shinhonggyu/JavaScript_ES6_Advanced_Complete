- [자바스크립트 엔진](#자바스크립트-엔진)
- [자바스크립트 런타임](#JS-런타임)
- [Garbage Collection](#Garbage-Collection)
- [최적화 코드 작성하기](#WRITING-OPTIMIZED-CODE)
- [콜스택 과 메모리힙](<#메모리힙과-콜스택(LIFO)>)
- [Execution Context](#Execution-Context)
- [Lexical Environment](#Lexical-Environment)
- [Scope Chain](#Scope-Chain)
- [Function and Block Scope](#Function-and-Block-Scope)
- [This](#This)
- [스코프](<#스코프(SCOPE)>)
- [JavaScript Types](#JAVASCRIPT-TYPES)
- [CLOSURES AND PROTOTYPES](#CLOSURES-AND-PROTOTYPES)
- [Closures](#Closures)
- [Prototypes](#Prototypes)
- [Object Oriented Programming](#Object-Oriented-Programming)
- [Functional Programming](#Functional-Programming)
- [Asyncronous JavaScript](#Asyncronous-JavaScript)
- [Modules](#*MODULES-IN-JAVASCRIPT)
- [Error Handling](#Error-Handling)
- [Data Structures In JavaScript](#Data-Structures-In-JavaScript)

#### **자바스크립트 엔진**

- JavaScript 엔진은 JavaScript 코드를 제공하는 컴퓨터 프로그램으로 컴퓨터에 실행 방법을 알려줍니다.
- 엔진 내부에서는 어떤 일이 발생하는지는 엔진에 달려 있습니다

![Image description](https://images.ctfassets.net/aq13lwl6616q/3o7Q3edCrVJG9Zzj6VMZ1K/28136a643636dfa04090f3fb5c5467ff/javascript_engine.png)

**Google이 Chrome V8 엔진을 만든 2008년은 JavaScript의 중요한 순간이었습니다.  
V8 엔진은 C ++로 작성되고 Chrome 브라우저에서 사용되며 Node JS를 지원하는 오픈 소스 고성능 JavaScript 엔진입니다.  
성능은 주로 엔진의 두 부분 인 인터프리터와 컴파일러를 결합하기 때문에 이전에 나온 엔진을 능가했습니다.  
오늘날 모든 주요 엔진은이 동일한 기술을 사용합니다.**

---

파싱은 소스 코드를 분석하고 오류를 확인한 다음 부분으로 나누는 프로세스입니다.  
파서는 Abstrack Syntax Tree(추상 구문 트리) or AST라 불리는 자료구조를 생성합니다  
AST는 원본 구문의 모든 세부 사항을 표시하지는 않지만 구조적 또는 콘텐츠 관련 세부 사항을 포함하는 소스 코드의 트리 그래프

#### **인터프리터와 컴파일**

- 인터프리터는 기계 언어 프로그램으로 컴파일 할 필요없이 코드의 각 줄을 한 줄씩 직접 실행합니다.
- Interpreters는 다양한 전략을 사용하여 성과를 높일 수 있습니다.
- 그들은 소스 코드를 파싱하고 즉시 실행할 수 있으며,이를보다 효율적인 기계 코드로 변환하거나, 컴파일러로 만든 미리 컴파일 된 코드를 실행하거나, 이들의 일부 조합을 실행할 수 있습니다.
- 컴파일러는 컴퓨터에서 읽고 실행할 수 있도록 미리 명령을 기계 코드 또는 하위 수준 형식으로 변환합니다.
- 모든 코드를 실행하고 코드의 기능을 파악한 다음 컴퓨터가 읽기 쉬운 다른 언어로 컴파일합니다.(Babel, TS)
- 현대 엔진에서 인터프리터는 코드를 한 줄씩 읽기 시작하고 프로파일 러는 자주 사용되는 코드와 플래그를 감시 한 다음 최적화를 위해 컴파일러에 전달합니다.
- 결국 JavaScript 엔진은 인터프리터가 출력하는 바이트 코드를 가져와 컴파일러가 출력하는 최적화 된 코드를 혼합 한 다음이를 컴퓨터에 제공합니다. 이를 "Just in Time"또는 JIT 컴파일러라고합니다.

---

#### WRITING OPTIMIZED CODE

1. Memoization

```js
// Bad Way
function addTo80(n) {
  console.log('long time...')
  return n + 80
}

addTo80(5)
addTo80(5)
addTo80(5)

// long time... 85
// long time... 85
// long time... 85

// Memoized Way
function memoizedAddTo80() {
  let cache = {}
  return function(n) { // closure to access cache obj (중첩된 함수에서 자식의함수가 부모함수에 정의된 변수들에 접근이가능한 것)
    if (n in cache) {
      return cache[n]
    } else {
      console.log('long time...')
      catch[n] = n + 80
      return catch[n]
    }
  }
}

const memoized = memoizedAddTo80()

console.log('1.', memoized(5))
console.log('2.', memoized(5))
console.log('3.', memoized(5))
console.log('4.', memoized(10))

// long time...
// 1. 85
// 2. 85
// 3. 85
// long time...
// 4. 90
```

2. Inline Caching

```js
function findUser(user) {
  return `found ${user.firstName} ${user.lastName}`
}

const userData = {
  firstName: 'Brittney',
  lastName: 'Postma
}

findUser(userData)

// if this findUser(userData) is called multiple times,
// then it will be optimized (inline cached) to just be found Brittney Postma
```

이 코드가 하나의 이름 만 반환하도록 최적화되면 다른 사용자를 반환해야하는 경우 컴퓨터에서 더 많은 작업을 수행해야합니다.

3. Hidden Classes

```js
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

obj1.a = 30;
obj1.b = 100;
obj2.b = 30;
obj2.a = 100;

delete obj1.x = 30;
```

이러한 값을 인스턴스화 된 것과 다른 순서로 설정함으로써
Hidden Classes로 인해 컴파일러 속도가 느려집니다.  
값이 설정된 순서와 다른 순서로 도입되면 컴파일러는 혼란스러워하고 공유 된 Hidden Classes가 없다고 생각할 수 있으며 두 가지 다른 것이므로 계산 속도가 느려집니다.  
또한 delete 키워드를 사용하지 않는 이유는 히든 클래스를 변경하기 때문입니다.

```js
// This is the more optimized version of the code.
function Animal(x, y) {
  // instantiating a and b in the constructor
  this.a = x;
  this.b = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

// and setting the values in order
obj1.a = 30;
obj1.b = 100;
obj2.a = 30;
obj2.b = 100;
```

---

#### 메모리힙과 콜스택(LIFO)

JavaScript 엔진은 우리를 위해 많은 일을하지만 가장 큰 작업 중 2 개는 그것을 읽고 실행하는 것입니다.  
데이터를 저장하고 쓸 장소와 실행중인 항목을 한 줄씩 추적 할 장소가 필요합니다. 이것이 `콜스택`과 `메모리 힙`이 들어오는 곳입니다.

메모리힙❗ (필요에 따라 메모리를 할당, 사용 및 제거하는 장소)

```js
// tell the memory heap to allocate memory for a number
const number = 11;
// allocate memory for a string
const string = 'some text';
// allocate memory for an object and it's values
const person = {
  first: 'Brittney',
  last: 'Postma',
};
```

콜스택(LIFO)❗ (콜스택은 코드에서 우리가 어디에 있는지 추적하므로 프로그램을 순서대로 실행할 수 있습니다.)

```js
function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}

debugger;
calculate();
```

---

#### STACK OVERFLOW

그렇다면 서로 중첩 된 함수를 계속 호출하면 어떻게 될까요? 이런 일이 발생하면이를 STACK OVERFLOW라고합니다.

```js
// When a function calls itself,
// it is called RECURSION
function inception() {
  inception();
}

inception();
// returns Uncaught RangeError:
// Maximum call stack size exceeded
```

---

#### Garbage Collection

- 함수 내부에 메모리를 할당하면 함수 호출이 완료되면 JavaScript가 자동으로 메모리 힙에서 메모리를 제거합니다.
- 그러나 그렇다고해서 메모리 누수를 잊을 수 있다는 의미는 아닙니다. 완벽한 시스템은 없으므로 항상 메모리 관리를 기억하는 것이 중요합니다.
- JavaScript는 mark and sweep 메소드로 가비지 콜렉션을 완료합니다.  
  ![Image Description](https://images.ctfassets.net/aq13lwl6616q/2lZxKSJGcJZxwRV4yLAIRn/f202496517023cede82dd7b4d7738ccd/mark_and_sweep.gif)

```js
var person = {
  first: 'Brittney',
  last: 'Postma',
};

person = 'Brittney Postma';
```

#### 메모리누수

위의 예에서는 메모리 누수가 발생합니다. 변수 person을 객체에서 문자열로 변경하면 first와 last의 값을 메모리 힙에 남겨두고 제거하지 않습니다  
변수를 전역 네임 스페이스(global)에서 제외하고 가능한 경우 함수 내부에서만 변수를 인스턴스화하여이를 방지 할 수 있습니다.  
`JavaScript is a single threaded language, meaning only one thing can be executed at a time.`  
`It only has one call stack and therefore it is a synchronous language`

#### **JS 런타임**

Playground [here](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

#### Synchronous

**싱글 스레드 언어의 문제는 무엇입니까❓**  
웹 페이지를 방문 할 때 브라우저를 실행합니다 (Chrome, Firefox, Safari, Edge).  
각 브라우저에는 개발자가 **window object**에서 액세스 할 수있는 웹 API 집합이 포함 된 고유 한 버전의 JavaScript 런타임이 있습니다.  
동기 언어에서는 한 번에 한 가지 작업 만 수행 할 수 있습니다.  
확인 버튼을 클릭 할 때까지 사용자가 페이지의 일부에 액세스하지 못하도록 차단하는 페이지의 경고를 상상해보십시오.
상당한 시간이 걸리는 JavaScript의 모든 것이 브라우저를 차단하면 사용자 경험이 상당히 나빠질 것입니다.  
**이것은 concurrency(동시성)과 이벤트 루프가 들어오는 곳입니다.**

---

#### Event Loop and Callback Queue ⭐

1. 브라우저에서 일부 JavaScript 코드를 실행하면 엔진이 코드 구문 분석을 시작합니다. 각 라인이 실행되고 콜스택에서 튀어 나옵니다.
2. 그러나 Web API는 어떻습니까? Web API는 JavaScript가 인식하는 것이 아니므로 파서는 그것을 처리 할 수 ​​있도록 브라우저에 전달합니다.
3. 브라우저가 메서드 실행을 마치면 JavaScript에서 실행하는 데 필요한 것을 콜백큐에 넣습니다.
4. 콜백큐는 콜스택이 완전히 비어있을 때까지 실행할 수 없습니다.
5. 따라서 이벤트 루프는 콜스택이 비어 있는지 지속적으로 확인하여 콜백큐에있는 항목을 콜스택에 다시 추가 할 수 있습니다.
6. 마지막으로 콜스택이 실행 된 다음 콜스택에서 팝업됩니다.

- 프로세스(운영체제위에서 독립적으로 메모리에서 실행되고있는 프로그램, 코드-스택-힙-데이터로 구성)
- 쓰레드(프로그램 안에서 동시에 여러개가수행될수있는 작은 일꾼단위,각각 고유스택을 가지고있고 프로세스의 코드-힙-데이터에 공통적으로 접근)
  > JavaScript는 싱글스레드 언어이므로 한 번에 한 가지만 실행할 수 있습니다. 콜스택이 하나뿐이므로 동기 언어이지만 JS가 동작하고있는 브라우저의 멀티쓰레딩인 WebAPIs 이용해 멀티쓰레딩이 가능하다

```js
console.log('1');
// 콜스택에 가서 실행 1
setTimeout(() => {
  console.log('2'), 1000;
});
// 웹 API로 전송됩니다.
// 웹 API가 1 초 동안 대기하고 실행 한 후 콜백큐로 보냅니다.
// 자바 스크립트 엔진이 계속 작동합니다
console.log('3');
// 콜스택으로 이동하여 3 실행
// 이벤트 루프가 계속 확인하고 호출 스택이 비어 있음을 확인합니다.
// 이벤트 루프는 콜백큐를 콜스택으로 보냅니다.
// 2

console.log('1');
setTimeout(() => {
  console.log('2'), 0;
});
console.log('3');

// 1
// 3
// 2
```

1. 이벤트루프는 콜스택에서 수행중인함수가있다면 끝날떄까지 머무른다
2. 60frames에 맞추어 주기적으로 Render를 업데이트해준다
3. MicroTaskQueue에 콜백함수가있다면 MicroTaskQueue가 빌떄까지 콜백함수를 콜스택으로 가지고와 수행함
4. TaskQueue(Callback Queue)에서는 한번에 하나의콜백함수만 가지고온다(콜백큐는 호출 스택이 완전히 비워 질 때까지 실행할 수 없습니다.)
5. 렌더업데이트시간이되면 requestAnimationFrame을 통해 등록된 콜백함수실행 -> RenderTree->layout->paint(레이어단위로 페인트를준비)->composition -> •••

#### MicroTaskQueue❗

1. 마이크로 태스크큐는 ES6에서 Promise와 함께 나옴.
2. promise를 사용하려면 promise 호출에 더 높은 우선 순위를 부여하는 또 다른 콜백큐가 필요했습니다.
3. JavaScript 엔진은 콜백큐 전에 MicroTaskQueue를 확인합니다.

```js
setTimeout(() => {
  console.log('1');
}, 0);
setTimeout(() => {
  console.log('2');
}, 10);
Promise.resolve('hi').then((data) => console.log('2', data));
console.log('3');

// 3
// 2 hi
// 1
// 2
```

---

#### Node.js ⭐

2009년까지 브라우저 내에서만 실행되던 JS를 브라우저외부에서 무언가를 빌드할수있게 실행시켜주는 실행프로그램  
Node JS는 C ++를 사용하여 비동기 작업을 실행하는 데 필요한 이벤트 루프 및 콜백 대기열을 제공하는 Chrome의 V8 엔진에 구축 된 JavaScript 런타임 환경입니다.

---

#### 3 Ways to Promise

There are 3 ways you could want promises to resolve,  
병렬 (all together), 순차적 (1 after another), or 경쟁 (doesn't matter who wins).

```js
// when new Promise is created, the excutor runs automatically.
const promisify = (item, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done: ${output1} ${output2} ${output3}`;
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

sequence().then(console.log);
parallel().then(console.log);
race().then(console.log);

// race is done: a
// parallel is done: a b c
// sequence is done: a b c
```

---

#### EXECUTION CONTEXT

실행 컨텍스트(Execution Context)는 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리  
JavaScript의 코드는 항상 일종의 실행 컨텍스트 내에서 실행됩니다  
**실행 컨텍스트(EXECUTION CONTEXT)는 단순히 코드가 실행되는환경 입니다  
JavaScript에는 Global 또는 Function의 두 가지 유형의 실행 컨텍스트가 있습니다  
각 컨텍스트에는 생성단계(creation phase) 및 실행단계(executing phase)의 두 단계가 있습니다  
JavaScript 엔진이 코드를 읽기 시작하면 Global Execution Context라는 것이 생성됩니다.  
{}이 사용될때 new lexical environment가 생성되고 함수실행컨텍스트는 엔진에게 현재작업중인 lexical environment 알려주고 렉시컬스코프는 접근가능한 변수들을 결정**

⭐Global Execution Context (this === window :true)

- 생성단계 Creation Phase

  1. global object(window) created
  2. initializes this keyword to global

- 실행단계 Executing Phase (actually run your code)

  3. 변수 환경 생성 - 생성 된 var 변수 및 함수를위한 메모리 공간
  4. 모든 변수를 undefined (호이스팅)으로 초기화하고 모든 함수와 함께 메모리에 배치합니다.

  ```js
  this;
  window;
  this === window;

  // Window {...}
  // Window {...}
  // true
  ```

⭐ Function Execution Context 함수가 호출 될 때만 함수 실행 컨텍스트가 생성됩니다.

- 생성단계 Creation Phase

  1. argument object created with any arguments
  2. 호출 된 지점 또는 지정되지 않은 경우 전역 개체를 가리 키도록this 키워드를 초기화합니다.

- 실행단계 Executing Phase

  3. 변수 환경 생성 - 생성 된 변수 및 함수를위한 메모리 공간
  4. 모든 변수를 undefined로 초기화하고 새 함수를 사용하여 메모리에 배치합니다.

  ```js
  // 함수 실행 컨텍스트는 arguments object를 생성하고 함수에 'this'를 가리 킵니다.
  function showArgs(arg1, arg2) {
    console.log('arguments: ', arguments);
    return `argument 1 is: ${arg1} and argument 2 is: ${arg2}`;
  }

  showArgs('hello', 'world');

  // arguments: { 0: 'hello', 1: 'world' }
  // argument 1 is hello and argument 2 is world

  function noArgs() {
    console.log('arguments: ', arguments);
  }

  noArgs();

  // arguments: {}
  // 인수가 없어도 객체는 여전히 생성됩니다.
  ```

  키워드 arguments는 코드에서 그대로 사용하는 것이 위험 할 수 있습니다.  
   ES6에서는 arguments를 더 잘 사용할 수있는 몇 가지 방법이 도입되었습니다.

  ```js
  function showArgs(arg1, arg2) {
    console.log('arguments: ', arguments);
    console.log(Array.from(arguments));
  }

  showArgs('hello', 'world');

  // arguments: { 0: 'hello', 1: 'world' }
  // [ 'hello', 'world' ]

  function showArgs2(...args) {
    console.log(console.log('arguments: ', args));
    console.log(Array.from(arguments));
    return `${args[0]} ${args[1]}`;
  }

  showArgs2('hello', 'world');

  // arguments: [ 'hello', 'world' ]
  // [ 'hello', 'world' ]
  // hello world
  ```

실행 컨텍스트는 실행 가능한 코드가 실행되기 위해 필요한 환경  
여기서 말하는 실행 가능한 코드는 아래와 같다

- 전역 코드 : 전역 영역에 존재하는 코드
- Eval 코드 : eval 함수로 실행되는 코드
- 함수 코드 : 함수 내에 존재하는 코드

일반적으로 실행 가능한 코드는 전역 코드와 함수 내 코드이다.

자바스크립트 엔진은 코드를 실행하기 위하여 실행에 필요한 여러가지 정보를 알고 있어야 한다  
 실행에 필요한 여러가지 정보란 아래와 같은 것들이 있다.

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

이와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다. 아래의 코드를 살펴보자.

```js
var x = 'xxx';

function foo() {
  var y = 'yyy';

  function bar() {
    var z = 'zzz';
    console.log(x + y + z);
    bar();
}
foo();

```

위 코드를 실행하면 아래와 같이 실행 컨텍스트 스택(Stack)이 생성하고 소멸한다  
현재 실행 중인 컨텍스트에서 이 컨텍스트와 관련없는 코드(예를 들어 다른 함수)가 실행되면 새로운 컨텍스트가 생성된다  
이 컨텍스트는 스택에 쌓이게 되고 컨트롤(제어권)이 이동한다.  
<img src="https://poiemaweb.com/img/ec_1.png" width="600">

1. 컨트롤이 실행 가능한 코드로 이동하면 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다. 스택은 LIFO(Last In First Out, 후입 선출)의 구조를 가지는 나열 구조이다.
2. 전역 코드(Global code)로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다. 전역 실행 컨텍스트는 애플리케이션이 종료될 때(웹 페이지에서 나가거나 브라우저를 닫을 때)까지 유지된다.
3. 함수를 호출하면 해당 함수의 실행 컨텍스트가 생성되며 직전에 실행된 코드 블록의 실행 컨텍스트 위에 쌓인다.
4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 직전의 실행 컨텍스트에 컨트롤을 반환한다.

#### 2. 실행 컨텍스트의 3가지 객체

실행 컨텍스트는 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념이지만 물리적으로는 객체의 형태를 가지며 아래의 3가지 프로퍼티를 소유한다.  
<img src="https://poiemaweb.com/img/excute_context_structure.png" width="300">

#### 2-1. Variable Object (VO / 변수객체)

실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 여러 정보들을 담을 객체 Variable Object(VO / 변수 객체)를 생성한다.  
Variable Object는 코드가 실행될 때 엔진에 의해 참조되며 코드에서는 접근할 수 없다. Variable Object는 아래의 정보를 담는 객체이다.

- 변수
- 매개변수(parameter)와 인수 정보(arguments)
- 함수 선언(함수 표현식은 제외)

Variable Object는 실행 컨텍스트의 프로퍼티이기 때문에 값을 갖는데 이 값은 다른 객체를 가리킨다.  
그런데 전역 코드 실행시 생성되는 전역 컨텍스트의 경우와 함수를 실행할 때 생성되는 함수 컨텍스트의 경우, 가리키는 객체가 다르다.  
이는 전역 코드와 함수의 내용이 다르기 때문이다. 예를 들어 전역 코드에는 매개변수가 없지만 함수에는 매개변수가 있다.

Variable Object가 가리키는 객체는 아래와 같다.

- 전역 컨텍스트의 경우  
  Variable Object는 유일하며 최상위에 위치하고 모든 전역 변수, 전역 함수 등을 포함하는 전역 객체(Global Object / GO)를 가리킨다.  
  전역 객체는 전역에 선언된 전역 변수와 전역 함수를 프로퍼티로 소유한다.

- 함수 컨텍스트의 경우  
  Variable Object는 Activation Object(AO / 활성 객체)를 가리키며 매개변수와 인수들의 정보를 배열의 형태로 담고 있는 객체인 arguments object가 추가된다.

#### 2.2 Scope Chain

현재 실행 컨텍스트의 활성 객체(AO)를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체(AO)를 가리키며 마지막 리스트는 전역 객체(GO)를 가리킨다.  
함수가 중첩 상태일 때 하위함수 내에서 상위함수의 스코프와 전역 스코프까지 참조할 수 있는데 이것는 스코프 체인을 검색을 통해 가능하다  
함수가 중첩되어 있으면 중첩될 때마다 부모 함수의 Scope가 자식 함수의 스코프 체인에 포함된다. 함수 실행중에 변수를 만나면 그 변수를 우선 현재 Scope, 즉 Activation Object에서 검색해보고, 만약 검색에 실패하면 스코프 체인에 담겨진 순서대로 그 검색을 이어가게 되는 것이다.

#### 2.3 this value

this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

---

#### Arrow Functions 💖

어떤 사람들은 화살표 함수를 일반 함수에 대한 syntactic sugar라고 생각하지만 화살표 함수는 일반 함수와 약간 다르게 작동합니다.  
일반 함수에 대한 간결한 대안이지만 this, arguments, super 또는 new.target 키워드에 대한 자체 바인딩이 없습니다.  
화살표 함수는 생성자로 사용할 수 없으며 메서드에 대한 best option이 아닙니다.

````js
var obj = {
  // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this), // 화살표 함수로 메소드를 정의하는 것은 피해야 한다
  c: function () {
    console.log(this.i, this);
  },
};

// 위 예제의 경우, 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨택스트인 전역 객체 window를 가리킨다.
obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}```
````

1.화살표 함수의 선언

```js
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

2.화살표 함수의 호출
화살표 함수는 익명 함수로만 사용할 수 있다❗ 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다❗

```js
// ES5
var pow = function (x) {
  return x * x;
};
console.log(pow(10)); // 100

// ES6
const pow = (x) => x * x;
console.log(pow(10)); // 100
```

또는 콜백 함수로 사용할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하다.

```js
// ES5
var arr = [1, 2, 3];
var pow = arr.map(function (x) {
  // x는 요소값
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]

// ES6
const arr = [1, 2, 3];
const pow = arr.map((x) => x * x);

console.log(pow); // [ 1, 4, 9 ]
```

3.화살표 함수의 this⭐
function 키워드로 생성한 일반 함수와 화살표 함수의 가장 큰 차이점은 this이다.  
일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

- 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
- 동적으로 결정되는 일반 함수와는 달리 *화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다. 이를 Lexical this*라한다.
- 화살표 함수의 this 바인딩 객체 결정 방식은 *함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프*와 유사하다.

  4.화살표 함수를 사용해서는 안되는 경우

1. 메소드
2. prototype
3. 생성자 함수
4. addEventListener 함수의 콜백 함수
   addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역 객체 window를 가리킨다.  
   따라서 addEventListener 함수의 콜백 함수 내에서 this를 사용하는 경우, function 키워드로 정의한 일반 함수를 사용하여야 한다.

---

#### HOISTING

JavaScript에서 함수는 완전히 호이스트되고, var 변수는 호이스트되고 undefined로 초기화된다  
let 및 const 변수는 호이스트되지만 값을 초기화하지는 않습니다.  
따라서 초기화되기 전에 코드에서 var 변수를 사용하면 undefined를 반환합니다.  
그러나 함수는 완전히 호이스트되어 있기 때문에 코드베이스의 어느 곳에서나 호출 할 수 있습니다.

```js
// var (don't ever use this!)
console.log(age); // 값을 할당하기전에 출력 undefined
age = 4; // 선언도 하기전에 값을할당가능
console.log(age); // 4
var age;

// let 및 const가 선언되기 전에 사용되면 아직 초기화되지 않았기 때문에 참조 오류가 발생합니다.
name = 4; // ReferenceError 선언전에 값을할당
let name;
```

```js
// function expression gets hoisted as undefined
var sing = function () {
  console.log('uhhhh la la la');
};

// function declaration gets fully hoisted
function sing2() {
  console.log('ohhhh la la la');
}
```

```js
// function declaration gets hoisted
function a() {
  console.log('hi');
}

// function declaration get rewritten in memory
function a() {
  console.log('bye');
}

console.log(a());
// bye
```

```js
// variable declaration gets hoisted as undefined
var favoriteFood = 'grapes';

// function expression gets hoisted as undefined
var foodThoughts = function () {
  // new execution context created favoriteFood = undefined
  console.log(`Original favorite food: ${favoriteFood}`);

  // variable declaration gets hoisted as undefined
  var favoriteFood = 'sushi';

  console.log(`New favorite food: ${favoriteFood}`);
};

foodThoughts();
```

```js
{
  age = 4;
  var age; // var는 Block scope도 무시
}
console.log(age); // 4
```

```js
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: foo is not defined
  let foo = 2; // 지역 변수
}
```

위 예제의 경우, 전역 변수 foo의 값이 출력될 것처럼 보인다. 하지만 ES6의 선언문도 여전히 호이스팅이 발생하기 때문에 참조 에러(ReferenceError)가 발생한다.  
ES6의 let으로 선언된 변수는 블록 레벨 스코프를 가지므로 코드 블록 내에서 선언된 변수 foo는 지역 변수이다. 따라서 지역 변수 foo도 해당 스코프에서 호이스팅되고 코드 블록의 선두부터 초기화가 이루어지는 지점까지 일시적 사각지대(TDZ)에 빠진다. 따라서 전역 변수 foo의 값이 출력되지 않고 참조 에러(ReferenceError)가 발생한다.

> Avoid hoisting when possible. It can cause memory leaks and hard to catch bugs in your code. Use let and const as your go to variables.

---

#### LEXICAL ENVIRONMENT

- _lexical environment은 기본적으로 엔진이 현재 코드를 읽고있는 scope(범위) 또는 environment(환경)입니다._
- _중괄호 {}를 사용하면 new lexical environment이 생성되며 중첩 된 괄호 {{...}}도 new lexical environment을 생성합니다._
- _그러므로 들여쓰기 없는함수의 lexical environment는 global scope_
- _실행 컨텍스트(EXECUTION CONTEXT)는 엔진에게 현재 작업중인 lexical environment을 알려주고 lexical scope는 사용 가능한 변수를 결정합니다._
- _in Javascript our lexical scope (available data + variables where the function was defined) determines our available variables._
- _Not where the function is called (dynamic scope), So it doesn't matter where we call our function._
- 렉시컬 스코프는 자바스크립트엔진이 코드를 실행하기전에 코드가 쓰여진곳에따라 각 함수가 어떤변수에 접근할수있는지 알려준다

```js
function one() {
  var isValid = true; // local env
  two(); // new execution context
}

function two() {
  var isValid; // undefined
}

var isValid = false; // global
one();

/* 
   two() isValid = undefined
   one() isValid = true
   global() isValid = false
   ------------------------
   call stack
*/
```

---

#### SCOPE CHAIN

<Img src="https://images.ctfassets.net/aq13lwl6616q/orTo9ia4TX3L5lXsW66rQ/575a4a80639a05791175fbfbd6af5826/scope_graph.png" width="600">

\*ach environment context that is created has a link outside of its lexical environment called the scope chain.  
The scope chain gives us access to variables in the parent environment.  
생성된 각 환경컨택스트에는 자신의 렉시컬환경의 외부에 스코프체인이라 불리는 링크를 가지고있습니다.  
스코프체인은 부모환경의 변수에 접근할수있게해줍니다.

```js
var x = 'x';

function findName() {
  console.log(x);
  var b = 'b';
  return printName();
}

function printName() {
  var c = 'c';
  return 'Brittney Postma';
}

function sayMyName() {
  var a = 'a';
  return findName();
}

sayMyName();

// sayMyName runs a = 'a'
// findName runs
// x
// b = 'b'
// printName runs c = 'c'
// Brittney Postma
```

이 예에서 모든 함수는 전역 변수 x에 액세스 할 수 있습니다.  
그러나 다른 함수에서 변수에 액세스하려고하면 오류가 반환됩니다.

⭐ The example below will show how the scope chain links each function.

```js
function sayMyName() {
  var a = 'a';
  console.log(b, c); // returns error
  return function findName() {
    var b = 'b';
    console.log(a); // a
    console.log(c); // returns error
    return function printName() {
      var c = 'c';
      console.log(a, b); // a, b
    };
  };
}

sayMyName()()(); //each function is returned and has to be called
```

이 예제에서 함수는 자식이 아닌 부모 컨테이너의 변수에만 액세스 할 수 있습니다.  
스코프 체인은 콜스택 아래로만 연결되므로 거의 반대로 생각해야합니다. 부모에게 올라가지 만 콜스택 아래로 내려갑니다.

<Img src="https://images.ctfassets.net/aq13lwl6616q/27194kxKraYM8yY7uwam8P/e087dd81d84e5788296d9a4a9e41253e/scope_chain.png" width="600" style="background:white">

---

#### JavaScript is Weird

```js
// global scope에게 height을 요청합니다
// 글로벌 스코프는 다음과 같이 말합니다 : 음 ... 아니요.하지만 여기서 방금 만들었습니다.
// 우리는 이것을 전역 변수의 누출(leakage of global variables)이라고 부릅니다.
// 파일에 'use strict'을 추가하면이를 방지하고 오류가 발생합니다.

function weird() {
  height = 50;
}

var heyhey = function doodle() {
  // code here
};

heyhey();
doodle(); // Error! because it is enclosed in its own scope.
```

---

#### **Function And Block scope**

ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다.  
var 키워드로 선언된 변수는 아래와 같은 특징이 있다. 이는 다른 언어와는 다른 특징으로 주의를 기울이지 않으면 심각한 문제를 일으킨다.

1. **함수 레벨 스코프(Function-level scope)**

   - **함수의 코드 블록만을 스코프(우리가 접근할수있는 변수) 로 인정한다. === Block scope를 무시한다**  
     **따라서 전역 함수 외부에서 생성한 변수는 모두 전역 변수이다. 이는 전역 변수를 남발할 가능성을 높인다**
   - **for 문의 변수 선언문에서 선언한 변수를 for 문의 코드 블록 외부에서 참조할 수 있다.**

2. **var 키워드 생략 허용**

   - 암묵적 전역 변수를 양산할 가능성이 크다.

   ```js
   'use strict';

   age = 4;
   console.log(age); // error
   ```

3. **변수 중복 선언 허용**

   - 의도하지 않은 변수값의 변경이 일어날 가능성이 크다.

   ```js
   var foo = 123; // 전역 변수

   console.log(foo); // 123

   {
     var foo = 456; // 전역 변수, 블록 레벨 스코프를 따르지 않는 var 키워드
   }

   console.log(foo); // 456

   // ES6는 블록 레벨 스코프를 따르는 변수를 선언하기 위해 let 키워드를 제공한다.
   ```

   ```js
   let foo = 123; // 전역 변수

   {
     let foo = 456; // 지역 변수
     let bar = 456; // 지역 변수
   }

   console.log(foo); // 123
   console.log(bar); // ReferenceError: bar is not defined
   ```

   ```js
   var foo = 123;
   var foo = 456; // 중복 선언 허용

   let bar = 123;
   let bar = 456; // Uncaught SyntaxError: Identifier 'bar' has already been declared
   ```

4. **변수 호이스팅**

   - 변수를 선언하기 이전에 참조할 수 있다

   ```js
   console.log(age); // undefined;
   age = 4; // 전역 변수
   console.log(age); // 4
   var age;

   name = 4;
   let name; // ReferenceError
   ```

대부분의 프로그래밍 언어는 블록 레벨 스코프(Block-level scope)를 따르지만 자바스크립트는 함수 레벨 스코프(Function-level scope)를 따른다.

ES6는 이러한 var 키워드의 단점을 보완하기 위해, block scope에 대한 액세스를 제공하기 위해 let과 const 키워드를 도입하였다.

**함수 레벨 스코프(Function-level scope)  
함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.  
즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.**

**블록 레벨 스코프(Block-level scope)  
모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.  
즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.**

```js
if (5 > 4) {
  var secret = '12345'; // var키워드는 블록레벨 스코프를 따르지않는다
}

console.log(secret); // 12345
// JS는 function scope 사용하므로
// var변수가 functionally scope 이기때문에 접근할수있다
// 다른언어에서는 block scope사용하므로 불가능⭐ => { } 볼때마다 new lexical environment를 만듭니다.

function a() {
  // new lexical environment
  var secret = '12345';
}

console.log(secret); // error

// - block scope에 대한 액세스를 제공하기 위해 ES6에서 let 및 const가 언어에 추가되었습니다.
if (5 > 4) {
  const secret = '12345';
  // you can only access it inside the block scope❗
}
// block scope 사용하게해준다 ⭐
console.log(secret); // error


//Function Scope
function loop() {
  for (var i = 0; i < 5, i++) {
    console.log(i);
  }
  console.log("final", i); // returns final 5
}

//Block Scope
function loop2() {
  for (let i = 0; i < 5; i++) {
    // can access i here
  }
  console.log("final", i); // returns an error here
}

loop();
/*
  1
  2
  3
  4
  final 5
*/
loop2();
// ReferenceError: i is not defined
```

- block scoping은 함수 내부뿐만 아니라 if 문 또는 loof 같은 중괄호 주위에 변수를 선언하는 것을 의미합니다.
- 함수를 생성 할 때마다 자체 변수 환경을 가진 새로운 실행 컨텍스트를 생성합니다.
- 대부분의 프로그래밍 언어는 block scope이므로 새로운 { } 를 볼 때마다 new lexical environment이 됩니다.
- 그러나 JS는 function scope이므로 global scope에서 function키워드를 사용할경우에만 new scope, new lexical environment를 만듭니다.

⭐{ }를 사용하면 lexical environment이 생성되고 lexical scope는 접근가능한변수를 결정한뒤 실행 컨텍스트가 생성되면  
 엔진은 해당 범위의 모든 var 변수에 메모리를 할당하고 undefined로 초기화합니다  
 let 및 const 변수는 실행되는 라인에서만 초기화되고 변수에 할당이없는 경우에만 정의되지 않은 상태로 할당됩니다.  
 let 또는 const 변수가 선언되기 전에 또는 반환하지 않고 블록 외부에 액세스하려고하면 참조 오류가 발생합니다.

```js
let globalName = 'global name'; // Global scope
{
  // Block scope
  let name = 'ellie';
  console.log(name); // ellie
  name = 'hello';
  console.log(name); // hello
  console.log(globalName); // global name
}
console.log(name); // 아무것도 안나옴.
console.log(globalName); // global name
```

전역 객체와 let  
전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window 객체, Server-side(Node.js)에서는 global 객체를 의미한다.  
var 키워드로 선언된 변수를 전역 변수로 사용하면 전역 객체의 프로퍼티가 된다.

```js
var foo = 123; // 전역변수

console.log(window.foo); // 123
```

let 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 전역 변수는 전역 객체의 프로퍼티가 아니다.  
즉, window.foo와 같이 접근할 수 없다. let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

```js
let foo = 123; // 전역변수

console.log(window.foo); // undefined
```

#### var vs. let vs. const

let은 재할당이 자유로우나 const는 재할당이 금지된다.  
주의할 점은 const는 반드시 선언과 동시에 할당이 이루어져야 한다는 것이다. 그렇지 않으면 다음처럼 문법 에러(SyntaxError)가 발생한다.  
`const FOO; // SyntaxError: Missing initializer in const declaration`
또한, const는 let과 마찬가지로 블록 레벨 스코프를 갖는다.

변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다.  
원시 값의 경우, 가급적 상수를 사용하는 편이 좋다. 그리고 객체를 재할당하는 경우는 생각보다 흔하지 않다. const 키워드를 사용하면 의도치 않은 재할당을 방지해 주기 때문에 보다 안전하다.

var와 let, 그리고 const는 다음처럼 사용하는 것을 추천한다.

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var, let 보다 안전하다.

변수를 선언하는 시점에는 재할당이 필요할지 잘 모르는 경우가 많다. 그리고 객체는 의외로 재할당을 하는 경우가 드물다. 따라서 변수를 선언할 때에는 일단 const 키워드를 사용하도록 하자. 반드시 재할당이 필요하다면(반드시 재할당이 필요한지 한번 생각해 볼 일이다.) 그때 const를 let 키워드로 변경해도 결코 늦지 않는다.

---

#### IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSION (Self-Executing Anonymous Function)

#### 즉시실행함수를 이용한 전역변수 사용 억제

즉시 호출 된 함수 표현식 또는 간단히 IIFE는 정의되는 즉시 실행되는 JavaScript 함수입니다

```js
// Grouping Operator () creates a lexical scope
(function () {
  // statements
})();
// Immediately invokes the function with 2nd set of ()
```

요점 : 가능한 경우 전역 네임 스페이스 또는 범위를 오염시키지 마십시오.  
전역변수 사용을 억제하기 위해, 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)를 사용할 수 있다.  
이 방법을 사용하면 전역변수를 만들지 않으므로 라이브러리 등에 자주 사용된다. 즉시 실행 함수는 즉시 실행되고 그 후 전역에서 바로 사라진다.

---

#### THIS

**This is the object that the function is a property of** ⭐  
**JS이외의 다른 OOP언어에서 THIS는 클래스자신이지만 JS에서 THIS란 만들어진객체 자기자신을가리키는것이 아닌 누가부르냐에따라(호출부) 달라진다.  
JS는 THIS라는 정보를담은 함수를 다른곳으로 할당하는순간 잃어버릴수있기때문에 Bind 또는 Class안에서 Arrow함수⭐로 선언해줌에따라 선언될당시 this에 바인딩할 객체가 정적으로 결정!  
*화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다. 이를 Lexical this*라한다.  
일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.**

```js
console.log(this); // window

function simpleFunc() {
  console.log(this);
}

window.simpleFunc(); // window
```

```js
class Counter {
  count = 0; // 멤버변수
  increase = function () {
    console.log(this);
  };
  decrease = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase(); // Counter {count: 0, increase: ƒ, decrease: ƒ}
const caller = counter.increase; // this라는 정보를담은 함수를 다른곳으로 할당.
const caller2 = counter.decrease;
caller(); // undefined ⭐ let과 const는 윈도우에등록되어있지않으므로 caller호출하는것은 window가아니다.❗
// ↑
caller2(); // Counter {count: 0, increase: ƒ, decrease: ƒ}
// ↑ ⭐화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
// 동적으로 결정되는 일반 함수와는 달리 *화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다. 이를 Lexical this*라한다.
// 화살표 함수의 this 바인딩 객체 결정 방식은 *함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프*와 유사하다.

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run2 = counter.decrease;
bob.run(); // Bob {run: ƒ}
bob.run2(); // Counter {count: 0, increase: ƒ, decrease: ƒ}
```

```js
const character = {
  name: 'Simon',
  getCharacter() {
    // 화살표 함수로 메소드를 정의하는 것은 피해야 한다 => getCharacter: function() {} => bind
    return this.name;
  },
};
const giveMeTheCharacterNOW = character.getCharacter.bind(character);

// How Would you fix this?
console.log('?', giveMeTheCharacterNOW()); //this should return 'Simon' bud doesn't
```

#### THIS - 2

**This is the object that the function is a property of** ⭐

Back in 실행 컨택스트(Execution Context),  
JavaScript 엔진이 어떻게 global execution context를 생성하고 this를 global window object에 초기화하는지에대해 설명했습니다.

```js
this; // Window {...}
window; // Window {...}
this === window; // true

function a() {
  console.log(this);
}

a(); // Window {...}
```

window 오브젝트안에 메소드a 가있으므로  
a ()를 호출하면 기본적으로 window.a ()를 콘솔에 말하는 것입니다.

```js
const obj = {
  property: `I'm a property of obj.`,
  method: function () {
    // this refers to the object obj
    console.log(this.property);
  },
};
obj.method();
// I'm a property of obj.
```

_this refers to whatever is on the left of the . (dot) when calling a method_

```js
// obj is to the left of the dot
obj.method();
```

**THIS의 이점: 1. gives methods access to there object**

```js
const obj = {
  name: 'Billy',
  sing() {
    return 'lalala' + this.name;
  },
  singAgain() {
    return this.sing() + '!';
  },
};

obj.singAgain();
```

**THIS의 이점: 2. execute same code for multiple objects**

```js
function importantPerson() {
  console.log(this.name + '!');
}

var name = 'Sunny';

const obj1 = {
  name: 'Cassy',
  importantPerson: importantPerson,
};

const obj2 = {
  name: 'Jacob',
  importantPerson: importantPerson,
};

importantPerson(); // Sunny
obj1.importantPerson(); // Cassy
obj2.importantPerson(); // Jacob
```

Still confused? Try this:

```js
function whichName() {
  console.log(this.name);
}

var name = 'window';

const obj1 = {
  name: 'Obj 1',
  whichName,
};
const obj2 = {
  name: 'Obj 2',
  whichName,
};

whichName(); // window
obj1.whichName(); // Obj 1
obj2.whichName(); // Obj 2
```

_this를 보는 또 다른 방법은 어떤 객체가 그것을 호출했는지 확인하는 것입니다._

```js
const a = function () {
  console.log('a', this);
  const b = function () {
    console.log('b', this);
    const c = {
      hi: function () {
        console.log('c', this);
      },
    };
    c.hi(); // new obj c called function
  };
  b(); // ran by a window.a(b())
};
a(); // called by window

// a Window {…}
// b Window {…}
// c {hi: ƒ}
```

Here is `this` 4 ways:

- new keyword binding: the new keyword바인딩은 this의 의미가 생성되는 객체가되도록 변경합니다.
- implicit(암시적) binding: "this"는 이를 호출하는 객체를 나타냅니다. 아무 것도하지 않고 언어가 작동하는 방식을 암시합니다.
- explicit(명시적) binding: "bind"키워드를 사용하여 "this"의 의미를 변경합니다.
- arrow functions as methods(화살표 함수로 메소드를 정의하는 것은 피해야 한다).  
  "this" is lexically scoped, refers to it's current surroundings and no further  
  그러나 "this"가 메서드의 함수 내에 있으면 범위를 벗어나 window obj에 속합니다. 이를 수정하려면 고차 함수를 사용하여 "this"를 호출하는 화살표 함수를 반환 할 수 있습니다. 아니면 ES6의 축약 메소드 표현

```js
// new binding❗
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}

const person1 = new Person('person1', 55);
console.log(person1);
// this = Person { name: 'person1', age: 55 }


// implicit(암시적) binding❗
const person = {
  name: 'person',
  age: 20,
  hi() { // === hi: function() {} 메소드를 위한 단축 표기법인 ES6의 축약 메소드 표현
    console.log(this);
  },
};

person.hi();
// this = person { name: 'person', age: 20, hi(){...} }

// 화살표 함수로 메소드를 정의하는 것은 피해야 한다. 화살표 함수로 메소드를 정의하여 보자.
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi undefined
// 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨택스트인 전역 객체 window를 가리킨다


// explicit binding(명시적 바인딩)❗
let name = 'Brittney'; ❓

const person3 = {
  name: 'person3',
  age: 50,
  hi: function () {
    console.log('hi ' + this.name);
  }.bind(window),
};

person3.hi();
// hi Brittney
// this = window {...}
// ⭐ let과 const는 window객체에 등록되지않으므로 undefined ⭐
// ⭐ var는 등록된다. 그후에 지우고해도 윈도우에남아있다❗(메모리누수) ⭐


// arrow functions inside objects❗
const person4 = {
  name: 'person4',
  age: 40,
  hi: function () {
    var inner = () => {
      console.log(this);
    };
    return inner();
  },
};

person4.hi();
// this = person4 { name: 'person4', age: 40, hi() {...} }
// if either function is changed around, it doesn't work
```

---

#### **스코프(SCOPE)**

**스코프는 우리가접근할수있는 변수, 변수를찾는규칙의집합**  
_스코프는 참조 대상 식별자(identifier, 변수, 함수의 이름과 같이 어떤 대상을 다른 대상과 구분하여 식별할 수 있는 유일한 이름)를 찾아내기 위한 규칙이다. 자바스크립트는 이 규칙대로 식별자를 찾는다._

```js
var x = 'global';

function foo() {
  var x = 'function scope';
  console.log(x);
}

foo(); // ?
console.log(x); // ?
```

식별자는 자신이 어디에서 선언됐는지에 의해 자신이 유효한(다른 코드가 자신을 참조할 수 있는) 범위를 갖는다.  
위 예제에서 전역에 선언된 변수 x는 어디에든 참조할 수 있다. 하지만 함수 foo 내에서 선언된 변수 x는 함수 foo 내부에서만 참조할 수 있고 함수 외부에서는 참조할 수 없다. 이러한 규칙을 스코프라고 한다.

#### 스코프 - 스코프의 구분

전역 스코프 (Global scope) - 코드 어디에서든지 참조할 수 있다.  
지역 스코프 (Local scope or Function-level scope)- 함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서만 참조할 수 있다.  
전역 변수 (Global variable) - 전역에서 선언된 변수이며 어디에든 참조할 수 있다.  
지역 변수 (Local variable) - 지역(함수) 내에서 선언된 변수이며 그 지역과 그 지역의 하부 지역에서만 참조할 수 있다.

변수는 선언 위치(전역 또는 지역)에 의해 스코프를 가지게 된다. 즉, 전역에서 선언된 변수는 전역 스코프를 갖는 전역 변수이고, 지역(자바스크립트의 경우 함수 내부)에서 선언된 변수는 지역 스코프를 갖는 지역 변수가 된다.

전역 스코프를 갖는 전역 변수는 전역(코드 어디서든지)에서 참조할 수 있다. 지역(함수 내부)에서 선언된 지역 변수는 그 지역과 그 지역의 하부 지역에서만 참조할 수 있다.

전역 변수의 사용은 변수 이름이 중복될 수 있고, 의도치 않은 재할당에 의한 상태 변화로 코드를 예측하기 어렵게 만드므로 사용을 억제하여야 한다.

#### 스코프 - 자바스크립트 스코프의 특징

자바스크립트는 다른언어와달리 함수 레벨 스코프(function-level scope)를 따른다.  
함수 레벨 스코프란 함수 코드 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고 함수 외부에서는 유효하지 않다(참조할 수 없다)는 것이다.

단, ECMAScript 6에서 도입된 let keyword를 사용하면 블록 레벨 스코프를 사용할 수 있다.

#### Function Scope vs Block Scope

JS는 함수안에서만 new scope, new environment 생성

let, const로 블록스코프사용.

```js
function loop() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('final', i);
}

loop(); // ?
// let: error
```

#### 스코프 - 렉시컬 스코프 vs 다이나믹 스코프

**In javascript our lexical scope (available data + variables where the function was defined) determines our available variables.  
Not where the function is called (dynamic scope)**

_렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다_

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

위 예제의 실행 결과는 함수 bar의 상위 스코프가 무엇인지에 따라 결정된다

1. 함수를 어디서 호출하였는지에 따라 상위 스코프를 결정하는 것 = 동적 스코프(Dynamic scope)
2. 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것 = 렉시컬 스코프(Lexical scope) 또는 정적 스코프(Static scope)

```js
const obj = {
  name: 'billy',
  sing() {
    // sing: function() {}
    console.log('a', this);
    var anotherFunc = function () {
      console.log('b', this);
    };
    anotherFunc();
  },
};

obj.sing();
// a {name: "Billy", sing: ƒ}
// b Window {…}
```

```js
var x = 1;

const obj = {
  name: 'billy',
  sing() {
    // sing: function() {}
    var x = 2;
    console.log(x, this);
    var anotherFunc = () => {
      console.log(x, this);
    };
    anotherFunc();
  },
};

obj.sing();
// 2 {name: "Billy", sing: ƒ}
// // 2 {name: "Billy", sing: ƒ}
```

```js
var b = {
  name: 'jay',
  say() {
    console.log(this);
  },
};

var c = {
  name: 'jay',
  say() {
    return function () {
      console.log(this);
    };
  },
};

var d = {
  name: 'jay',
  say() {
    return () => console.log(this);
  },
};

b.say(); // b {name: 'jay', say()...}
// b called the function
c.say(); // function() {console.log(this)}
// returned a function that gets called later
c.say()(); // Window {...}
// c.say() gets the function and the Window runs it
d.say(); // () => console.log(this)
// returned the arrow function
d.say()(); // d {name: 'jay', say()...}
// arrow function does not rebind this and inherits this from parent
```

#### 스코프 - 암묵적 전역

```js
// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo() {
  // 선언하지 않은 식별자
  y = 20;
  console.log(x + y);
}

foo(); // 30

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined
```

이는 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 되기 때문이다.

1. foo 함수가 호출되면 자바스크립트 엔진은 변수 y에 값을 할당하기 위해 먼저 스코프 체인을 통해 선언된 변수인지 확인한다
2. 이때 foo 함수의 스코프와 전역 스코프 어디에서도 변수 y의 선언을 찾을 수 없으므로 참조 에러가 발생해야 하지만 자바스크립트 엔진은 y = 20을 window.y = 20으로 해석하여 프로퍼티를 동적 생성한다.
3. 결국 y는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작한다. 이러한 현상을 암묵적 전역(implicit global)이라 한다.
4. 하지만 y는 변수 선언없이 단지 전역 객체의 프로퍼티로 추가되었을 뿐이다. 따라서 y는 변수가 아니다. 따라서 변수가 아닌 y는 변수 호이스팅이 발생하지 않는다.
5. 또한 변수가 아니라 단지 프로퍼티인 y는 delete 연산자로 삭제할 수 있다. 전역 변수는 프로퍼티이지만 delete 연산자로 삭제할 수 없다.

---

#### Context vs Scope

스코프는 함수가 호출되었을때 접근할수있는 변수
컨택스트는 this값이 무엇인지 말한다.

---

#### JAVASCRIPT TYPES

**Primitive: number, string, boolean, bigint, symbol, null, undefined** : **define by JS** ⭐

- 원시 값은 불변으로 정의되며 변경할 수 없습니다.(변경이 불가능하다는 뜻은 메모리 영역에서의 변경이 불가능하다는 뜻이다. 재할당은 가능하다)
- Primitives는 값으로 전달됩니다. 즉, 값이 복사 된 다음 메모리의 다른 곳에 배치됩니다.

```js
let str = 'Hello';
str = 'world';
```

위에서 메모리에 문자열 ‘Hello’가 생성되고 식별자 str은 메모리에 생성된 문자열 ‘Hello’의 메모리 주소를 가리킨다  
그리고 두번째 구문이 실행되면 이전에 생성된 문자열 ‘Hello’을 수정하는 것이 아니라 새로운 문자열 ‘world’를 메모리에 생성하고 식별자 str은 이것을 가리킨다  
이때 문자열 ‘Hello’와 ‘world’는 모두 메모리에 존재하고 있다. 변수 str은 문자열 ‘Hello’를 가리키고 있다가 문자열 ‘world’를 가리키도록 변경되었을 뿐이다.

```js
var statement = 'I am an immutable value'; // string은 immutable value

var otherStr = statement.slice(8, 17);

console.log(otherStr); // 'immutable'
console.log(statement); // 'I am an immutable value'
```

2행에서 Stirng 객체의 slice() 메소드는 statement 변수에 저장된 문자열을 변경하는 것이 아니라 사실은 새로운 문자열을 생성하여 반환하고 있다. 그 이유는 문자열은 변경할 수 없는 immutable value이기 때문이다.

_Object(Non Primitive): function, array....._ **REFERENCE TYPE** ⭐ **define by programmer** ⭐

**객체는 변경 될 수 있으며 해당 속성은 참조로 전달되므로 해당 속성은 메모리에 별도로 저장되지 않습니다.**

```js
var arr = [];
console.log(arr.length); // 0

var v2 = arr.push(2); //v2 = 1, arr.push()는 메소드 실행 후 arr의 length를 반환
console.log(arr.length); // 1
```

객체인 arr은 push 메소드에 의해 update되고 v2에는 배열의 새로운 length 값이 반환된다.  
배열은 객체이고 객체는 immutable value가 아닌 변경 가능한 값이기 때문이다.

**Object.assign () 또는 전개연산자 {...} 를이용해 원본을 변경하지 않고 새 변수를 수정할 수 있습니다.  
그러나 이들은 "shallow copy"만 만듭니다.**

```js
let obj = {
  a: 'a',
  b: 'b',
  c: {
    deep: 'try and copy me',
  },
};

let clone = Object.assign({}, obj); //shallow clone
let clone2 = { ...obj }; //shallow clone
let superClone = JSON.parse(JSON.stringify(obj)); // deep clone

obj.c.deep = 'hahaha';
console.log(obj);
console.log(clone);
console.log(clone2);
console.log(superClone);
```

```js
// Exercise❗
const number = 100;
const string = 'Jay';
let obj1 = {
  value: 'a',
};
let obj2 = {
  value: 'b',
};
let obj3 = obj2;

function change(number, string, obj1, obj2) {
  number = number * 10;
  string = 'Pete';
  obj1 = obj2;
  obj2.value = 'c';
}

change(number, string, obj1, obj2);

//Guess the outputs here before you run the code:
console.log(number);
console.log(string);
console.log(obj1.value);
```

falsy값

- flase
- 0, -0, +0
- ""
- null
- undefined
- NaN

---

#### **CLOSURES AND PROTOTYPES**

클로저와 프로토 타입 상속은 JavaScript를 특별하게 만들고 다른 프로그래밍 언어와 다른 두 가지 요소입니다.

**Function Constructor** (함수)생성자

**함수는 JavaScript에서 객체이며 다른 언어에는 해당되지 않습니다.**  
그 때문에 여러 가지 방법으로 호출 할 수 있지만 **생성자 일 수도 있습니다**  
**함수생성자는 새 객체를 만들고 반환합니다.**  
모든 JavaScript 함수는 실제로 함수 객체 자체입니다

```js
// function constructor
new Function('optionalArguments', 'functionBody');

// 함수를 생성함 ❗❗
const four = new Function('return 4'); // 4
const four = new Function('num', 'return num'); // 4
four(4);
const sum = new Function('x', 'y', 'return x + y');
console.log(sum(2, 3)); // 5
```

**JavaScript의 거의 모든 것은 생성자로 만들 수 있습니다.**
**숫자 및 문자열과 같은 기본적인 JavaScript 유형도 생성자를 사용하여 만들 수 있습니다.**

```js
// examples of constructor functions in JavaScript
const five = new Number(5);
const assignFive = 5;

// this is different than using regular assignment
const newString = new String(`I am a new string`);
const assignString = `I am an assigned string`;

typeof five; // object
typeof assignFive; // number
typeof newString; //object
typeof assignString; // string

five === assignFive; // false
five == assignFive; // true - types are coerced

// Notice how the types are different
// depending on how they are created.

// Arrays, Booleans, Dates, Objects, and Strings
// can be created this way as well.
```

**Functions are first class citizens in JS**

```js
// first-class
const addTwo = (a) => a + 2;
const multiplyTwo = (a) => a * 2;
const transform = (numbers) => numbers.map(addTwo).map(multiplyTwo);
transform([1, 2, 3, 4]);
```

```js
// higher-order functions
const addToppings = (topping) => (food) => food + topping;
const egg = addToppings('🥚');
console.log(egg('🥓'));
```

```js
// 1
var stuff = function () {};

// 2
function a(fn) {
  fn();
}

a(function () {
  console.log('hi there');
});

// 3
function b() {
  return function c() {
    console.log('hi there');
  };
}

b()();

var d = b();
d();
```

```js
function a() {
  //  initialize the function just once❗
}
for (let i = 0; i < 5; i++) {
  a(); // 여기서 함수선언하지말기❗
}
```

```js
function a(param = 6) {
  return param;
}

a();
```

**Higher Order Functions**
A Higher Order Function (HOF)는 함수를 인수로 사용하거나 다른 함수를 반환하는 함수입니다.  
There are 3 kinds of functions in JavaScript

- function ()
- function (a,b)
- function hof() { return function () {} }

**동일한 작업을 수행하는 여러 함수를 작성하는 대신 DRY를 기억하십시오(don't repeat yourself)**

1. Level 1

```js
function letAdamLogin() {
  let array = [];
  for (let i = 0; i < 10000000; i++) {
    array.push(i);
  }
  return 'Access Granted to Adam';
}

function letEvaLogin() {
  let array = [];
  for (let i = 0; i < 10000000; i++) {
    array.push(i);
  }
  return 'Access Granted to Eva';
}

letAdamLogin();
letEvaLogin();
```

2. Level 2

```js
const giveAccessTo = (name) => 'Access Greanted to' + name;

function letUserLogin(user) {
  // we now tell WHAT DATA to use.
  let array = [];
  for (let i = 0; i < 10000000; i++) {
    array.push(i);
  }
  return giveAccessTo(user);
}

letUserLogin();
```

3. HOC

```js
const giveAccessTo = (name) => 'Access Greanted to' + name;

function authenticate(verify) {
  // we now tell WHAT DATA to use.
  let array = [];
  for (let i = 0; i < verify; i++) {
    array.push(i);
  }
  return giveAccessTo(person.name);
}

function sing(person) {
  return 'hi' + person.name;
}

function letPerson(person, fn) {
  if (person.level === 'admin') {
    return fn(person);
  } else if (person.level === 'user') {
    return fn(person);
  }
  return giveAccessTo(person.name);
}

letPerson({ level: 'admin', name: 'Brittney' }, sing);
```

bad❗

```js
const giveAccessTo = (name) => console.log(`Access granted to ${name}`);

function auth(roleAmt) {
  let array = [];
  for (let i = 0; i < roleAmt; i++) {
    array.push(i);
  }
  return true;
}

function checkPerson(person, fn) {
  if (person.level === 'admin') {
    fn(100000);
  } else if (person.level === 'user') {
    fn(500000);
  }
  return giveAccessTo(person.name);
}

checkPerson({ level: 'admin', name: 'Brittney' }, auth);
```

Gooooooood❗

```js
function multBy(a) {
  return function (b) {
    return a * b;
  };
}

// can also be an arrow function
const multiplyBy = (a) => (b) => a * b;

const multByTwo = multiplyBy(2);
const multByTen = multiplyBy(10);

multByTwo(4); // 8
multByTen(5); // 50
```

#### **Closures**

1. function ran
2. the function excuted.
3. it's never going to execute again.
4. BUT is's going remember that there are references to these variable
5. so the child scope always the access to the parent scope.

**클로저는 함수가 선언 된 스코프를 벗어난 이후에도 둘러싸는 scope 또는 환경에서 변수에접근할수있도록해준다**  
**중첩된 함수에서 자식의함수가 부모함수에 정의된 변수들에 접근이가능한 것들이 클로져**  
**즉, 클로저를 사용하면 내부 범위(inner scope)에서 외부 함수 범위(outer functions scope)에 액세스 할 수 있습니다.**  
**JavaScript 엔진은 변수가 콜스택에서 튀어 나온 후에 "sweeping"하는 대신 ⭐변수를 참조하는 함수 내부에 변수를 보관합니다.⭐**

클로저를 사용하면 함수가 선언된 스코프를 떠난이후에도 주변을둘러싼 스코프또는 환경에서 변수에접근할수있습니다.

클로저가 유익한 두 가지 주요 이유는 **메모리 효율성**과 **캡슐화**입니다.

```js
function a() {
  let grandpa = 'grandpa'
  return function b() {
    let father = 'father'
    let random = 12345 // not referenced, will get garbage collected ⭐
    return function c() {
      let son = 'son'
      return `closure inherited all the scopes: ${grandpa} > ${father} > ${son}`
    }
  }
}

a()()()

// closure inherited all the scopes: grandpa > father > son

const closure = grandma => mother => daughter => return `${grandma} > ${mother} > ${daughter}`

// grandma > mother > daughter
```

```js
// Exercise
function callMeMaybe() {
  setTimeout(function () {
    console.log(callMe);
  }, 4000);
  const callMe = 'Hi! I am now here!';
}

callMeMaybe();
```

⭐클로저가 유익한 두 가지 주요 이유는 **메모리 효율성**과 **캡슐화**입니다.⭐

```js
// Memory efficient👍
function heavyDuty(index) {
  const bigArray = new Array(7000).fill('👍');
  console.log('created');
  return console.log(bigArray[index]);
}

heavyDuty(699);
heavyDuty(699);
heavyDuty(699);
const getHeavyDuty = heavyDuty2();
getHeavyDuty(688);
getHeavyDuty(700);
getHeavyDuty(800);

function heavyDuty2() {
  const bigArray = new Array(7000).fill('👍');
  console.log('created Again❗');
  return function (index) {
    return console.log(bigArray[index]);
  };
}
```

Encapsulation means the restriction of direct access to some of an object's components  
캡슐화는 객체의 일부 컴포넌트들에에 대한 직접 접근 제한을 의미합니다.  
가능한 한 객체의 내부 부분을 숨기고 실행에 필요한 부분 만 노출합니다.

캡슐화를 사용하는 이유❓

1. Security - Controlled access
2. Hide Implementation and Expose Behaviours(구현 숨기기 및 동작 노출)
3. Loose Coupling - Modify the implementation at any time(느슨한 결합-언제든지 구현 수정)

```js
// Encapsulation👍
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return '💥';
  };
  setInterval(passTime, 1000);
  return {
    totalPeaceTime: totalPeaceTime,
  };
};
const ohno = makeNuclearButton();
ohno.totalPeaceTime();
```

```js
// Encapsulation👍
const encapsulation = () => {
  let people = [];
  const setName = (name) => people.push(name);
  const getName = (idx) => people[idx];
  const rmName = (idx) => people.splice(idx, 1);
  return {
    setName,
    getName,
    rmName,
  };
};
const data = encapsulation();
data.setName('Brittney'); // 0
data.getName(0); // 'Brittney'
data.rmName(0); // ['Brittney']
// you have no access to the array people
// can only change it via methods provided
```

Closure Exercise

```js
// Closure Exercise 1
let view;
function initialize() {
  view = '👍';
  console.log('view has been set!');
}

initialize(); // view has been set!
initialize(); // view has been set!
initialize(); // view has been set!
```

```js
let view;
function initialize() {
  let called = 0;
  return function () {
    if (called > 0) {
      return;
    } else {
      view = '👍';
      called++;
      console.log('view has been set!');
    }
  };
}
const startOnce = initialize();
startOnce();
console.log(view);
```

```js
// Closure Exercise 2
const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
  (function (closureI) {
    setTimeout(function () {
      console.log('I am at index' + array[closureI]);
    }, 3000);
  })(i);
}
```

#### Prototype💖(Inheritance:상속을 구현 할수있다, 속성과 함수들을 정의)을 기반으로해서 객체지향프로그래밍과 코드재사용 할수있다

#### behavior reuse 행동재사용(Inheritance) by reusing existing objects(기존에있는 오브젝트 재사용)

```js
const array = [];
array.__proto__; // [...]
array.__proto__.__proto__; // {...}
array.toString(); // "" 오브젝트 메쏘드(프로토타입체인)
```

```js
let dragon = {
  name: 'Tanya',
  fire: true,
  fight() {
    return console.log(5);
  },
  sing() {
    if (this.fire) {
      return console.log(`I am ${this.name}, the breather of fire`);
    }
  },
};

let lizard = {
  name: 'KiKi',
  fight() {
    return console.log(1);
  },
};

// const singLizard = dragon.sing.bind(lizard);
// console.log(singLizard()); // I am KiKi, the breather of fire

lizard.__proto__ = dragon; // 프로토타입 체인⭐
console.log(lizard.fire);
lizard.sing(); // I am KiKi, the breather of fire
lizard.fight(); // 1❗
// lizard.dance(); error -> lized 의프로토타입체인 dragon -> 드래곤의 프로토타입체인  -> { }
console.log(dragon.__proto__); // { } base object
console.log(dragon.isPrototypeOf(lizard)); // { } true
// dragon -> dragon의 프로토타입체인 { } base object의 isPrototypeOf
// ⭐ lizard inherit from Dragon
```

```js
let dragon = {
  name: 'Tanya',
  fire: true,
  fight() {
    return console.log(5);
  },
  sing() {
    if (this.fire) {
      return console.log(`I am ${this.name}, the breather of fire`);
    }
  },
};

let lizard = {
  name: 'KiKi',
  fight() {
    return console.log(1);
  },
};

lizard.__proto__ = dragon; // create 프로토타입체인
for (let prop in lizard) {
  if (lizard.hasOwnProperty(prop)) {
    // { } base obj method
    console.log(prop); // name, fight
  }
  console.log(prop); // name, fight, fire, sing
}
```

#### **Prototypal Inheritance**

Javascript의 거의 모든 객체는 프로토 타입 체인을 통해 속성을 전달합니다.  
이 체인을 프로토 타입 상속이라고합니다.  
객체의 자식은 부모의 속성을 "상속"합니다.  
JavaScript의 모든 객체는 의도적으로 생성하거나 변경하지 않도록 변경하지 않는 한 Object 생성자의 자손입니다.  
**객체는 Object.prototype에서 메서드와 속성을 상속합니다.**  
프로토 타입 속성에는 현재 객체와 객체가 생성 된 "프로토 타입"을 가리키는 링크를 생성하는 **proto**라는 접근 자 속성도 있습니다.

```js
Object.prototype.__proto__;
// null

Object.prototype;
{
  __proto__: null;
  // ...more methods and properties
}

Object;
// function Object()
// This is the object constructor function

Object.prototype.constructor;
// function Object()
// Points to the constructor

Object.__proto__;
// function () {...}
// Because it is created with a constructor function
```

**`__proto__` actually lives on the prototype**

**we shouldn't use⭐**proto** = some type of an object** (performance reason)

```js
let human = {
  mortal: true,
};
let socrates = Object.create(human);
console.log(socrates); // {}
console.log(socrates.__proto__); // {mortal: true}
socrates.age = 45;
console.log(socrates); // {age: 45}
console.log(socrates.mortal); // true
console.log(human.isPrototypeOf(socrates)); // true
// // ⭐ socrates inherit from human
```

**every function has a prototype property**  
**Javascript의 모든 것은 JavaScript의 객체입니다**  
**배열 및 함수는 base object 로부터 프로토 타입 체인을 통해 상속되는 객체입니다.**

#### Prototype vs `__proto__`

**proto**와 프로토 타입의 차이점을 이해하는 것은 JavaScript 개발자에게 매우 혼란스러운 개념 일 수 있습니다.  
JavaScript의 모든 함수는 생성 될 때 call, apply 및 bind methods를 제공하는 프로토 타입 속성을 자동으로 가져옵니다.  
실제로 일반 함수로는 아무 작업도하지 않지만 생성자 함수에서 prototype 속성을 사용하면 생성 한 객체에 자체 메서드를 추가 할 수 있습니다.  
JavaScript에서 새 객체가 생성 될 때마다 `__proto__` getter 함수를 사용하여 생성되는 항목을 기반으로 내장 된 생성자 함수를 사용합니다.  
이는 배열, 부울, 날짜, 숫자, 개체, 문자열, 함수 또는 RegExp 일 수 있습니다. 각각에는 생성자에서 상속하는 고유 한 별도의 속성과 메서드가 있습니다  
`__proto__` 속성은 프로토 타입 객체 간의 링크를 생성하는 것이며, 자식은 프로토 타입 체인을 통해 부모로부터 속성을 상속받습니다.

<img src="https://images.ctfassets.net/aq13lwl6616q/4U7Xxx4CIyG6bHmpOp6ujj/00720fdac4cb138ed97e80da74730cd2/prototype_chain.png"
width="700">

```js
let newArr = new Array
newArr
/* []
    {
// all array properties and methods
// inherited from Array constructor function.
      length: 0
      prototype: {
        concat, forEach, pop, splice...
        __proto__: Array(0)
        prototype: {
          __proto__: Object
          prototype: {
            __proto__: null
          }
        }
      }
    }
```

**`__proto__` always points to prototype**⭐
**only functions have the prototype property**⭐

Exercise

```js
// Exercise - extend the functionality of a built in object

// 1.
// Date object -> to have new method .lastYear() which shows you last year 'YYYY' format.

new Date('1900-10-10').lastYear();
// '1899'

// Answer
Date.prototype.lastYear = function () {
  return this.getFullYear() - 1;
};
```

---

#### **Object Oriented Programming**

객체 지향 프로그래밍의 네 가지 기둥

1. encapsulation 메소드와 속성을사용하여 상자(객체)들이 상호작용함으로써 유지보수, 재사용
2. abstraction
3. inheritance DRY, 메모리효율
4. polymorphism 다형성

객체 지향 프로그래밍 (OOP)은 프로그램을 더 쉽게 읽고 이해할 수 있도록 **모든 코드를 "상자"(객체)로 그룹화해야한다**는 생각입니다.

1. Clear + Understandable
2. Easy to Extend
3. Easy to Maintain
4. Memory Efficient
5. DRY

데이터를 캡슐화하면 프로그램을 구성하는 데 도움이됩니다.  
**각 객체에는 자신이하는 일을 정의하는 상태와 상태를 사용하거나 수정할 수있는 메서드 (객체에 대한 함수)가 있습니다.**  
자바 스크립트의 거의 모든 것이 객체라는 점을 고려하면이 작업이 쉬울 것이라고 생각할 것입니다.  
모두 다른 능력을 가진 많은 캐릭터가있는 게임을 만들고 싶다고 가정 해 보겠습니다. 이것에 대해 어떻게할까요?

```js
// DRY(don't repeat yourself)
const elf1 = {
  name: 'Dobby',
  type: 'house',
  weapon: 'cloth',
  say: function () {
    return console.log(`Hi, my name is ${this.name}, I am a ${this.type} elf.`);
  },
  attack: function () {
    return console.log(`attack with ${this.weapon}`);
  },
};

const elf2 = {
  name: 'Legolas',
  type: 'high',
  weapon: 'bow',
  say: function () {
    return console.log(`Hi, my name is ${this.name}, I am a ${this.type} elf.`);
  },
  attack: function () {
    return console.log(`attack with ${this.weapon}`);
  },
};

elf1.attack(); // attack with cloth
elf2.attack(); // attack with bow
```

#### **Factory Functions**

보시다시피이 코드는 이미 매우 **반복적**이며 한 문자 유형만으로는 유지 관리 할 수 ​​없습니다.  
더 많은 캐릭터를 추가한다고 상상해보십시오.  
그래서 **객체를 생성하는 또 다른 방법 인 Factory Functions이 도입**되었습니다.  
Factory Functions는 실행될 때마다 새 객체를 반환합니다.

```js
function createElf(name, type, weapon) {
  return {
    name: name,
    type: type,
    weapon: weapon,
    say() {
      return `Hi, my name is ${name}, I am a ${type} elf.`;
    },
    attack() {
      return `${name} attacks with ${weapon}`;
    },
  };
}

const dobby = createElf('Dobby', 'house', 'cloth');
const legolas = createElf('Legolas', 'high', 'bow');

dobby.say(); // Hi, my name is Dobby, I am a house elf.
legolas.say(); // Hi, my name is Legolas, I am a high elf.
dobby.attack(); // Dobby attacks with cloth.
legolas.attack(); // Legolas attacks with bow.
```

#### **Stores**

이것은 올바른 방향으로 나아가는 단계이지만 캐릭터를 더 추가하면 동일한 문제가 다시 발생하게됩니다.  
코드가 DRY가 아닐뿐만 아니라 the attack method이 생성되고 모든 새로운 엘프에 대한 메모리 공간을 차지합니다.  
이것은 매우 효율적이지 않습니다.  
이 문제를 어떻게 해결합니까? 우리는 메소드를 store로 분리 할 수 ​​있습니다.

```js
function createElf(name, type, weapon) {
  return {
    name: name, // old way
    type, // with ES6 assignment, if they are the same name
    weapon,
  };
}

// each method has to be assigned to the store method to
// create the __proto__ chain
const dobby = createElf('Dobby', 'house', 'cloth');
dobby.attack = elfMethodsStore.attack;
dobby.say = elfMethodsStore.say;

const legolas = createElf('Legolas', 'high', 'bow');
legolas.attack = elfMethodsStore.attack;
legolas.say = elfMethodsStore.say;
```

#### **Object.create**

store가 있으면 메모리 효율성이 어느 정도 절약되었지만 각 메소드를 할당하는데 많은 수작업이 필요했습니다.  
따라서 각 메서드를 할당 할 필요없이 체인을 만드는 데 도움이되도록 Object.create가 제공되었습니다.

```js
const elfMethodsStore = {
  attack() {
    return `attack with ${this.weapon}`;
  },
  say() {
    return `Hi, my name is ${this.name}, I am a ${this.type} elf.`;
  },
};

function createElf(name, type, weapon) {
  // this creates the __proto__ chain to the store ⭐
  let newElf = Object.create(elfMethodsStore);
  console.log(newElf.__proto__); // { attack: [Function], say: [Function] }
  // this assigns all the methods
  newElf.name = name;
  newElf.type = type;
  newElf.weapon = weapon;
  // this returns the new Elf with everything attached
  return newElf;
}

const dobby = createElf('Dobby', 'house', 'cloth');
const legolas = createElf('Legolas', 'high', 'bow');
dobby.attack(); // attack with cloth
legolas.attack(); // attack with bow
```

#### **Constructor Functions(생성자 함수)**

Object.create를 사용하는 것은 진정한 프로토 타입 상속이며 코드가 더 깨끗하고 읽기 쉽습니다.  
그러나 대부분의 프로그램에서 사용되는 것을 볼 수 없습니다.  
Object.create가 나오기 전에 Constructor Functions(생성자 함수)를 사용할 수있었습니다.  
Constructor functions(생성자 함수)는 위에서 언급 한 함수 생성자(function constructor)와 똑같습니다.  
숫자 및 문자열 함수는 new keyword로 구성 및 호출되었으며 대문자로 표시되었습니다.  
new 키워드는 실제로 생성자 함수의 의미를 변경합니다.  
new가 없으면 방금 만든 객체 대신 window object 를 가리 킵니다.  
생성자 함수를 대문자로 사용하여 식별하고 new 키워드를 사용하는 방법을 아는 것이 가장 좋습니다.  
생성자 함수에 추가 된 속성은 this 키워드를 사용해야 만 수행 할 수 있으며 일반 변수는 객체에 추가되지 않습니다.

```js
// constructor functions are typically capitalized
function Elf(name, type, weapon) {
  // not returning anything
  // "constructing" a new elf
  this.name = name;
  this.type = type;
  this.weapon = weapon;
}

// to use a constructor function
// the "new" keyword must be used
const dobby = new Elf('Dobby', 'house', 'cloth');
const legolas = new Elf('Legolas', 'high', 'bow');

// To add methods we need to add ⭐
Elf.prototype.attack = function () {
  // cannot be an arrow function ⭐
  // this would be scoped to the window obj
  return `attack with ${this.weapon}`;
};
// This would need to be repeated for each method.

dobby.attack(); // attack with cloth
legolas.attack(); // attack with bow
```

```js
// Constructor Functions
const Elf1 = new Function(
  'name',
  'weapon',
  `this.name = name
   this.weapon = weapon`
);

const sarah = new Elf1('sarah', 'fireworks');
console.log(sarah);
```

JavaScript의 생성자 함수는 실제로 생성자 자체입니다.

#### **Class**

아직 헷갈 리 시나요? 프로토 타입은 프로토 타입 상속을 실제로 이해하지 않는 한 약간 이상하고 읽기 어렵습니다.  
아무도 **메소드를 추가하는 프로토 타입 방식**을 좋아하지 않았기 때문에 ES6 JavaScript는 클래스 키워드를 제공했습니다.  
그러나 JavaScript의 클래스는 실제 클래스가 아니며 syntactic sugar입니다.  
내부적으로는 여전히 오래된 prototype method를 사용하고 있습니다.  
사실 그것들은 하나의 큰 차이가있는 "special functions"일뿐입니다. functions은 호이스트되고 클래스는 그렇지 않습니다.  
코드베이스에서 사용하기 전에 클래스를 선언해야합니다.  
클래스에는 클래스로 생성 된 객체를 생성하고 인스턴스화하는 생성자 인 new 메서드도 함께 제공됩니다.  
extends 키워드를 사용하여 클래스를 확장 할 수 있으므로 하위 클래스를 만들 수 있습니다.  
extended class에 생성자가있는 경우 constructor를 base class에 연결하려면 super 키워드가 필요합니다.  
새로운 객체를 클래스와 비교하기 위해 instanceof 키워드를 사용하여 클래스에서 상속 된 것이 있는지 확인할 수 있습니다.

```js
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return `attack with ${this.weapon}`;
  }
}

class Elf extends Character {
  constructor(name, weapon, type) {
    super(name, weapon);
    // pulls in name and weapon from Character
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  enrage() {
    return `double attack power`;
  }
}

const legolas = new Elf('Legolas', 'bow', 'high');
const gruul = new Ogre('Gruul', 'club', 'gray');

console.log(legolas.attack());
console.log(gruul.enrage());
console.log(gruul.attack());

console.log(legolas instanceof Elf);
console.log(gruul instanceof Ogre);
```

#### **\_Private and public fields**

**대부분의 클래스 기반 언어에는 클래스 내에서 공용 또는 개인 필드(public or private fields)를 만드는 기능이 있습니다.**  
자바 스크립트의 클래스에 추가하는 것은 아직 개발중인 실험적 기능입니다.  
브라우저에서의 지원은 제한적이지만 Babel과 같은 시스템으로 구현할 수 있습니다.  
**공개 선언(Public declarations)**은 생성자 위에 설정되며 클래스 내에서 사용할 수 있지만 새 인스턴스에 추가되지는 않습니다.  
**private 선언**은 변수 앞에 # 기호로 설정되며 해당 클래스 내에서만 액세스 할 수 있으며 외부에서 액세스하거나 변경할 수 없습니다.

```js
// public declarations
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

// private declarations
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}
```

**this - 4 Ways**

```js
// new binding this
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('shin', 30);
console.log(person1);

// implicit binding
const person2 = {
  name: 'Karen',
  age: 40,
  hi() {
    console.log('hi' + this.name);
  },
};

// explicit binding
const person3 = {
  name: 'Karen',
  age: 40,
  hi: function () {
    console.log('hi' + this.setTimeout);
  }.bind(window),
};

// arrow function (lexical scoping)
const person4 = {
  name: 'Karen',
  age: 40,
  hi: function () {
    var inner = () => {
      console.log('hi' + this.name);
    };
    return inner();
  },
};

const person4 = {
  name: 'Karen',
  age: 40,
  hi: function () {
    function inner() {
      console.log(this); // window
    }
    return inner();
  },
};

person4.hi();
```

**Inheritance**

```js
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return console.log('attack with ' + this.weapon);
  }
}

const fiona = new Elf('Fiona', 'ninja stars');
const ogre = { ...fiona }; // {name: "Fiona", weapon: "ninja stars"}
// ogre.__proto__ {}
// fiona.__proto__ Elf {}
// fiona === ogre false
// these objects are not referencing the same place in memory ⭐
// also lost prototype chain
// inheritance comes in

// base class
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return console.log('attack with ' + this.weapon);
  }
}

// Elf now has a prototype chain up to Character
class Elf extends Character {
  // extend and set the prototype => __proto__ to point to character
  constructor(name, weapon, type) {
    // console.log(this) error❗
    // because in order to use this keyword inside of constructor (when we extend⭐) have to call super first❗
    super(name, weapon); // call the elf superclass is Character constructor
    // console.log(this) { name: 'Dolby', weapon: 'cloth' }
    this.type = type;
  }
}

const dolby = new Elf('Dolby', 'cloth', 'house');
```

**Inheritance Exercise**

```js
class Character {
  constructor(name, weapon) {
    (this.name = name), (this.weapon = weapon);
  }
  attack() {
    return 'attack with ' + this.weapon;
  }
}

class Queen extends Character {
  constructor(name, weapon, kind) {
    super(name, weapon);
    this.kind = kind;
  }
  attack() {
    console.log(super.attack());
    return `I am the ${this.name} of ${this.kind}, now bow down to me! `;
  }
}
//Polymorphism--
//Extend the Character class to have a Queen class. The output of the below code should be:
const victoria = new Queen('Victoria', 'army', 'hearts');
// create a new instace with the queen having (name, weapon, type). Type inlcudes: 'hearts', 'clubs', 'spades', 'diamonds'

victoria.attack();
// will console.log the attack() method in Character class AND will return another string: 'I am the Victoria of hearts, now bow down to me! '
```

---

#### **FUNCTIONAL PROGRAMMING**

1. **Pure Functions**
2. **Stateless, Immutability**
3. **Expressions Only**

```js
// ❌ Not statements like if, switch, for...
let number = [1, 2, 3];

function multiply(numbers, multiplier) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * multiplier;
  }
}

// expressions
function multiply(numbers, multiplier) {
  return numbers.map((num) => num * multiplier);
}
```

4. **First-class and higher-order functions**  
   함수를 변수에 할당하거나 함수에 인자로 전달하거나 리턴하는 등의 일들을 할수있는 First Class 특징과  
   함수에서 또다른 함수를 리턴하는 고차함수 이 두가지 속성을 가지고 있어야합니다.

함수형 프로그래밍은 객체 지향 프로그래밍과 동일한 목표를 염두에두고 있으므로 코드를 이해하기 쉽고 확장하기 쉬우 며 유지 관리하기 쉬우 며 메모리 효율적이며 DRY를 유지합니다.  
**객체 대신 재사용 가능한 함수를 사용하여 데이터를 만들고 작업합니다.**  
함수형 프로그래밍은 객체 지향 프로그래밍과 유사한 관심사 분리를 기반으로합니다.  
그러나 **함수형 프로그래밍에서는 데이터와 프로그램의 동작이 완전히 분리되어 있습니다.**  
또한 **어떤 것이 만들어지면 변경되지 않아야한다는 생각도 있습니다.**  
**OOP와 달리 shared state는 함수형 프로그래밍이 pure functions개념에서 작동하므로 피합니다.**

**Exercise**⭐

```js
// Amazon shopping
const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
};

//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.
```

**Pure Functions**❗

```js
// ❌
let num = 1;

function add(a) {
  return a + num;
}
```

```js
// 동일한 인자, 동일한 결과값
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
```

**순수 함수는 그 밖의 어떤 것에 대한 side effects이 없으며 동일한 입력이 주어지면 항상 동일한 값을 출력합니다.**  
전달 된 데이터를 변경하지 않고 원본을 변경하지 않고 반환 할 새 데이터를 만듭니다.  
그러나 100 % pure functions을 가질 수는 없습니다.  
어느 시점에서 DOM과 상호 작용하거나 API를 가져와야합니다.  
console.log조차도 함수 외부에서 window object를 사용하기 때문에 함수를 순수하지 않게 만듭니다.  
사실은 프로그램은 side effects없이 존재할 수 없다는 것입니다.  
따라서 **함수형 프로그래밍의 목표는 부작용을 데이터에서 분리하여 최소화하는 것**입니다.

다음을 수행하는 매우 작고 재사용 가능하며 예측 가능한 순수 함수를 많이 빌드하십시오.  
 ⭐PERFECT FUNCTION⭐

- **Complete 1 task per function. (기능 당 작업 1 개를 완료하십시오.)**
- **Do not mutate state. (상태를 변경하지 마십시오.)**
- **Do not share state. (상태를 공유하지 마십시오.)**
- **Be predictable. (예측 가능합니다.)**
- **Be composable, one input and one output. (하나의 입력과 하나의 출력으로 구성 가능해야합니다.)**
- **Be pure if possible. (가능하면 순수하십시오.)**
- **Return something. (무언가를 반환하십시오.)**

1. 순수함수는 몇번을 호출하던 동일한 input에 항상 동일한 output을 리턴한다
2. 순수함수는 함수외부에 어떤것이라도 수정할수없다

```js
// 함수 외부것을 수정하는 side effects가 있다❗
// side effiects that reusing shared state❗
const array = [1, 2, 3];
function mutateArray(arr) {
  arr.pop();
}
function mutateArray2(arr) {
  arr.forEach((item) => {
    arr.push(1);
  });
}
// 함수 호출 순서가 중요합니다.⭐
mutateArray(array);
console.log(array); // [1, 2]
mutateArray2(array);
console.log(array); // [1, 2, 1, 1]
```

**no side effects code**

```js
// no side effects
// input -> output
const array = [1, 2, 3];
function removeLastItem(arr) {
  const newArray = [].concat(arr);
  newArray.pop();
  return newArray;
}

function multiplyBy2(arr) {
  return arr.map((item) => item * 2);
}

const array2 = removeLastItem(array);
const array3 = multiplyBy2(array);
console.log(array, array2, array3);
```

Is that a pure function ❓

```js
function a() {
  console.log('hi');
}
```

console.log는 window wepAPI이다.❗  
브라우저를 사용하여 브라우저에 무언가를 기록하고 있습니다.  
그래서 그것은 실제로 외부 세계에 영향을 미치고 있습니다.

입력 결과는 항상 동일한 출력이어야합니다.  
동일한 입력이 주어지면 함수가 항상 동일한 출력을 반환.

**Referential transparency (참조 투명성)**
함수형 프로그래밍의 중요한 개념 중 하나는 프로그램 결과를 변경하지 않고 표현식을 결과 값으로 대체하는 기능인 참조 투명성입니다.

```js
function a(num1, num2) {
  return num1 + num2;
}

function b(num) {
  return num * 2;
}

b(a(3, 4)); // 14
// a should always return 7
// so it could be changed to
b(7); // 14
// and the output is the same
```

함수형 프로그래밍의 기둥 pure function 👍

1. no side effect ❗
2. same input no matter how many times we call it gives us the same output ❗

**Idempotence (멱등법칙 : 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 의미)**  
멱등성은 함수형 프로그래밍의 또 다른 중요한 부분입니다.  
함수에 동일한 입력이 주어지면 항상 동일한 출력을 반환한다는 생각입니다.  
이 기능은 계속해서 사용할 수 있으며 아무것도 변경되지 않습니다.  
이것이 **코드를 예측 가능하게 만드는 방법**입니다.

```js
Math.abs(Math.abs(-50));
```

**Imperative(명령적) vs Declarative(선언적)**

Imperative(명령적)code is tells the machine what to do and how to do it  
Declarative(선언적)code is tells the machine what to do and what should happen.
it doesn't tell the computer how to do things.❗

Humans are declared.❗

그러나 JavaScript와 같은 고급 언어를 사용하는 것은 실제로 덜 선언적입니다.  
이것은 함수 프로그래밍에서 중요합니다.  
우리 코드를 더 잘 이해하고 컴퓨터가 작업을 수행하는 가장 좋은 방법을 알아내는 더러운 작업을 처리하도록하기 위해 선언 적이기를 원하기 때문입니다.

<img src="https://images.ctfassets.net/aq13lwl6616q/5nFLOTAXwQRDSb2WDlJSFN/bb8d98271f6f1e491142d11249557b76/imperative_code.png"
width="700">

**Immutability(불변성)** ⭐

```js
// ❌
let person = { name: 'ellie', age: 20 };

function increaseAge(person) {
  person.age = person.age - 5;
  return person;
}
```

```js
// Stateless, Immutability ⭐
// No SideEffect ⭐
let person = Object.freeze({ name: 'ellie', age: 20 });

function increaseAge(person) {
  return Object.freeze({ ...person, age: person.age + 1 });
}
```

**불변성은 단순히 원본 데이터 나 상태(state)를 수정하는 것이 아닙니다.**  
**대신 함수 내부에 state의 복사본을 만들고 새로운 버전의 state를 반환해야합니다.**

```js
// Bad code
const obj = { name: 'Brittney' };

function clone(obj) {
  return { ...obj }; // this is pure
}

// obj.name = 'Joe'; mutated the state

// Better code
function updateName(obj) {
  const newObj = clone(obj);
  newObj.name = 'Joe';
  return newObj;
}

const updatedNameObj = updateName(obj);
console.log(obj);
console.log(updatedNameObj);
```

코드를 반복해서 복사하는 데 메모리 측면에서 비용이 많이들 수 있다고 생각할 수 있습니다.  
그러나 데이터가 새 정보 만 복사하고 공통성을 위해 원래 상태를 가리킬 수있는 structural sharing(구조적 공유)라는 것이 있습니다.  
<img src="https://images.ctfassets.net/aq13lwl6616q/7hMhPpSyzvev3ERSpooIC3/6e2b4401726e627db5777f1bde116148/structure_tree.png" width="400">  
Persistent data structure  
컴퓨팅에서 영구 데이터 구조는 수정 될 때 항상 이전 버전을 보존하는 데이터 구조입니다.  
이러한 데이터 구조는 작업이 내부 구조를 업데이트하지 않고 항상 새로 업데이트 된 구조를 생성하기 때문에 사실상 변경 불가능합니다

**HOC, Closure**  
JavaScript functions are first class citizens which means we can have high order functions and closure

```js
// HOF
const hof = () => () => 5;
hof(); // function
hof()(); // 5

const hof = (fn) => fn(5);
hof(function a(x) {
  return x;
});

// Closure
// in javascript we create closure whenever a function accesses a variable defined outside of the immediate function scope that is the scope of the parent.
const closure = function () {
  let count = 0;
  return function increment() {
    count++;
    return console.log(count);
  };
};

const incrementFn = closure();
incrementFn(); // 1
incrementFn(); // 2
```

**Currying**

```js
// currying
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyBy5 = curriedMultiply(5);

// 10years
curriedMultiplyBy5(4);
curriedMultiplyBy5(4);
curriedMultiplyBy5(4);
```

**Partial Application(부분 적용)**  
부분적 적용은 커링 아이디어를 확대하고 매개 변수를 분리하여 한 단계 더 발전시키고 있습니다.  
함수에 두 개 이상의 인수가있는 경우 그 중 하나를 나중에 사용할 값에 바인딩 할 수 있습니다.

```js
const multiply = (a, b, c) => a * b * c;
const curriedMultiplyBy5 = multiply.bind(null, 5); // this is null

curriedMultiplyBy5(4, 10); // 200
```

커링과 부분적용의 차이점  
Partial Application is on the second call i expect all the arguments.  
currying says i expect one argument at a time.

#### **Memoization + Caching** 👍

```js
function addTo80(n) {
  console.log('long time..');
  return console.log(n + 80);
}

let cache = {};
function memoizedAddTo80(n) {
  if (n in cache) {
    return console.log(cache[n]);
  } else {
    console.log('long time..');
    cache[n] = n + 80;
    return console.log(cache[n]);
  }
}

memoizedAddTo80(5);
memoizedAddTo80(5);
memoizedAddTo80(6);
```

#### **Memoization + Caching + Closure** 👍👍

```js
function addTo80(n) {
  console.log('long time..');
  return console.log(n + 80);
}

// let cache = {};
// we don't want to fill the cache in global scope❗
function memoizedAddTo80() {
  let cache = {};
  // problem is now that everytime we run this cache gets reset❗
  return function (n) {
    // closure 생성해서 avoid global scope⭐
    if (n in cache) {
      return console.log(cache[n]);
    } else {
      console.log('long time..');
      cache[n] = n + 80;
      return console.log(cache[n]);
    }
  };
}

const memoized = memoizedAddTo80();
memoized(5);
memoized(5);
memoized(6);
memoized(5);
```

**Dynamic programming allows us to use memoization to optimize code** 💖

**Pipe and Compose** 💖💖
JavaScript에서는 속도와 효율성을 위해 함수를 작고 재사용 할 수 있도록 유지하는 것이 가장 좋습니다.  
Function composition은 공장 조립 라인과 같이 functions를 배치하는 아이디어입니다.  
실제 functions pipe () 및 compose ()는 아직 JavaScript에 실제로 존재하지 않지만이를 사용하는 라이브러리가 많이 있습니다.  
그러나 자신의 버전을 만들 수 있습니다.  
compose () 함수는 오른쪽에서 왼쪽으로 함수를 읽고 pipe () 함수는 왼쪽에서 오른쪽으로 읽습니다.

```js
// create our own COMPOSE function
const compose = (fn1, fn2) => (data) => fn1(fn2(data));
// create our own PIPE function
const pipe = (fn1, fn2) => (data) => fn2(fn1(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
// use compose to combine multiple functions
const composeFn = compose(multiplyBy3, makePositive); // return composeFn(data)⭐
const pipeFn = pipe(multiplyBy3, makePositive); // return pipeFn(data) ⭐
composeFn(-50); // 150
pipeFn(-50); // 150

// essentially we are doing this
// fn1(fn2(fn3(50)))
// compose(fn1, fn2, fn3)(50)
// pipe(fn3, fn2, fn1)(50)
```

**Arity**  
Arity는 단순히 함수가 취하는 인수의 수를 의미합니다.  
함수에 매개 변수가 많을수록 분리 및 재사용이 더 어려워집니다.  
함수를 작성할 때 1 개 또는 2 개의 매개 변수 만 고수하십시오.

#### **Reviewing Functional Programming** ☕

- 1 Task
- return Statement
- Pure
- No shared state
- Immutable State
- Composable
- Predictable

```js
// Amazon shopping
const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
};

//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.
```

Solution

```js
const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
};

const userHistory = [];

function addToCart(user, item) {
  userHistory.push(
    Object.assign({}, user, { cart: user.cart, purchases: user.purchases })
  );
  const updateCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updateCart });
}

function taxItems(user) {
  userHistory.push(
    Object.assign({}, user, { cart: user.cart, purchases: user.purchases })
  );
  const { cart } = user;
  const taxRate = 1.4;
  const updatedCart = cart.map((item) => {
    return {
      name: item.name,
      price: item.price * taxRate,
    };
  });
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItems(user) {
  userHistory.push(
    Object.assign({}, user, { cart: user.cart, purchases: user.purchases })
  );
  return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
  userHistory.push(
    Object.assign({}, user, { cart: user.cart, purchases: user.purchases })
  );
  return Object.assign({}, user, { cart: [] });
}

function refundItem(user, item) {
  userHistory.push(
    Object.assign({}, user, { cart: user.cart, purchases: user.purchases })
  );
  const { purchases } = user;
  const refundItem = purchases.splice(item);
  return Object.assign({}, user, { purchases: refundItem });
}
const compose = (fn1, fn2) => (...args) => fn1(fn2(...args));

const purchaseItems = (...fns) => fns.reduce(compose);

purchaseItems(
  emptyCart,
  buyItems,
  taxItems,
  addToCart
)(user, { name: 'laptop', price: 200 });

refundItem(user, { name: 'laptop', price: 200 });

console.log(userHistory);
```

그렇다면 함수형 프로그래밍이 모든 것에 대한 답일까요❓  
아니요,하지만 **동일한 데이터 집합에 대해 다른 작업을 수행**해야하는 상황에서 유용합니다.  
함수형 프로그래밍은 필요에 따라 이동할 수있는 재사용 가능한 함수를 만들기위한 토대를 마련합니다.  
예를 들어 산업 및 machine learning 분야에서 훌륭하며 React 및 Redux와 같은 일부 프런트 엔드 라이브러리에서도 마찬가지입니다.  
Redux는 JavaScript 개발자를위한 함수형 프로그래밍을 정말 대중화했습니다.

---

#### **OOP vs FP**

**COMPOSITION VS INHERITANCE**  
컴포지션은 방금 FP로 수행 한 작업으로, 코드를 모듈화하기 위해 재사용 가능한 작은 함수를 만듭니다.  
상속은 OOP로 클래스를 만들고 속성을 상속하는 하위 클래스로 확장하는 것입니다.  
OOP에서 우리는 부작용이있는 상태 저장 공통 데이터에 대해 몇 가지 작업을 생성합니다.  
FP에서는 상태를 변경하지 않는 순수 함수로 고정 데이터에 대한 많은 작업을 만듭니다.  
어느 것이 더 나은지에 대한 큰 논쟁이 있으며 대부분의 사람들은 composition이 더 좋다고 생각합니다.

**OOP Problems**  
상속의 단점 중 하나는 그것이 변경되지 않는다는 사실에 기반을두고 있다는 것입니다. 우리는 그것이 무엇인지 알려줍니다.  
클래스를 만들고 클래스를 설명하는 속성과 메서드를 제공합니다.  
하지만 앞으로는 해당 클래스를 업데이트하고 더 많은 기능을 추가해야합니다.  
기본 클래스에 새 메서드를 추가하면 전체 프로그램에 잔물결 효과가 생깁니다.  
FP는 더 선언적이고 어떻게할지가아닌 무엇을할지 , OOP는 무엇을 어떻게해야하는지 더 중요합니다.  
이것은 긴밀한 결합 문제입니다. 서로 의존해야하는 것은 취약한 기본 클래스 문제로 이어지고, 겉보기에 안전한 변경으로 인해 예기치 않은 영향이 발생합니다.  
재사용 가능한 작은 코드의 반대입니다.  
클래스 또는 하위 클래스 중 하나에서 작은 것을 변경하면 프로그램이 중단 될 수 있습니다.  
또 다른 문제는 계층 구조로, 클래스의 한 부분 만 수행 할 수있는 하위 클래스를 만들어야 할 수 있지만 대신 모든 것이 전달됩니다.

**Finally**  
컴포지션은 향후 변경하기 쉬운보다 안정적인 환경을 만들기 때문에 프로그램을 만들 때 사용하기에 더 좋은 도구 일 것입니다.  
핵심은 프로젝트에 더 적합한 구조를 결정하는 것입니다.  
이 두 스타일의 아이디어를 사용하여 코드를 작성할 수 있습니다.  
React는 class components에서 OOP를 사용하여 상속을 확장 한 다음 pure components에서 FP를 사용합니다.

---

#### **Asyncronous JavaScript**

```js
setTimeout(() => console.log('1'), 0);
setTimeout(() => console.log('2'), 1000);

Promise.resolve('hi').then((data) => console.log('2', data));

console.log('3');
```

**A promise is an object that may produce a single value some time in the future** 🙌

**Either a resolved value, or a reason that it's not resolved(rejected)**

**a promise maybe in one of three possible States fullfilled, rejected or pending**

```js
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((res) => res.json());
  })
).then((results) => {
  console.log(results[0]);
  console.log(results[1]);
  console.log(results[2]);
});
```

```js
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async function (url) {
        const response = await fetch(url);
        return response.json();
      })
    );
    console.log('users', users);
    console.log('posts', posts);
    console.log('albums', albums);
  } catch (error) {
    console.log('ooooooooops', error);
  }
};

const getData2 = async function () {
  const arrayOfPromises = urls.map((url) => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};
```

```js
const promisify = (item, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

// parallel().then(console.log);

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

// race().then(console.log);

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

sequence().then(console.log);
```

---

#### **MODULES IN JAVASCRIPT**

모듈은 함께 그룹화 된 코드 조각으로, 함께 결합하여 필요에 따라 확장 가능한 프로그램을 만들 수 있습니다.  
좋은 모듈은 자체 포함되어 있으며 프로그램을 중단하지 않고 이동하거나 삭제할 수 있도록 자체 특정 기능과 함께 그룹화됩니다.

**Module Patterns**  
원래 JavaScript에서는 모듈 패턴이있었습니다.  
block scope가 나오기 전에는 global scope와 function scope.만있었습니다.  
이러한 모듈 개념을 만들기 위해 module scope가 function scope 바로 위에 구현되었습니다.  
이를 통해 global scope를 거치지 않고도 함수간에 exporting 및 importing를 통해 변수를 공유 할 수 있습니다.  
모듈로서의 함수는 본질적으로 즉시 호출되는 함수 표현식 IIFE입니다.

**Issues with Modules**  
모듈이 코드를 포함하고 구성하는 데 도움이되지만 여전히 발생할 수있는 문제가 있습니다.  
const를 사용하여 모듈을 선언하지 않으면 이름 충돌이 발생할 수 있습니다.  
또한 스크립트가 잘못된 순서로 배치되면 종속성 문제가 있습니다 (예 : jQuery를 사용하기 전에 호출해야 함).  
이러한 문제 때문에 사람들은이를 해결하기 위해 libraries을 개발하기 시작했습니다.  
ES6 이전에는 JavaScript CommonJS 및 AMD에서 모듈을 구현하는 두 가지 방법이있었습니다.

- **CommonJS**  
  모듈 시스템과 상호 작용하기 위해 require 및 exports 키워드를 사용합니다.  
  Require는 다른 모듈에서 가져 오는 데 사용되는 함수이고 exports는 함수를 내보내는 객체입니다.  
  이들은 다른 모듈이 시작되기 전에로드되기를 기다리는 한 모듈에서 동기식으로 실행되며 브라우저에는 적합하지 않습니다.  
  그러나 NodeJS가 여전히 이 라이브러리를 사용하기 때문에이 코드는 익숙해 보일 수 있습니다.  
  브라우저에서 사용할 CommonJS와 함께 스크립트를 번들링하는 데 도움이되는 Browserify 및 webpack과 같은 다른 패키지가 있습니다.

- **Asynchronous Module Definition (AMD)**  
  이름에서 알 수 있듯이 AMD는 모듈을 비동기 적으로로드합니다.  
  이것은 코드를 번들로 묶은 패키지 이전의 브라우저에 아주 좋습니다.  
  define 함수는 백그라운드에서 비 차단 방식으로로드되는 종속성 모듈의 배열을 사용합니다.  
  완료되면 콜백 함수가 실행됩니다.  
  패키지는 AMD endpoint를 구현하고 사람들이 AMD 모듈을 사용하는 주요 방법 인 RequireJS처럼 나왔습니다.

**ES6 Modules** 💖  
ES6가 나온 후, 위의 거의 모든 것이 2 개의 새로운 키워드로 창 밖으로 던져졌습니다.  
이제 파일에서 import 및 export 키워드를 사용하여 모듈을 구현할 수 있습니다.

```js
import module1 from 'module1';
import module2 from 'module2';

export function name() {}
```

다음은 새로운 ES6 구문에서 위의 모듈 코드입니다.

```js
const privateVar = 'I cannot be accessed outside this file';

export function name(msg1, msg2) {
  const say1 = Math.floor(Math.random() * msg1.length);
  const say2 = Math.floor(Math.random() * msg2.length);
  return say1 > say2 ? say1 : say2;
}
```

**export에는 name과 default의 두 가지 유형이 있습니다.**  
A named export는 중괄호 ({importFnName})를 사용하여 가져오고 default function은 다음과 같이 생성됩니다.

1. Named Exports (Zero or more exports per module)❗
2. Default Exports (One per module)❗

```js
import { importFnName } from './script.js';
// with a default function the {} are not needed
import name from './script.js';
// both default and named function import
import name, { importFnName } from './script.js';

export default function name(msg1, msg2) {
  const say1 = Math.floor(Math.random() * msg1.length);
  const say2 = Math.floor(Math.random() * msg2.length);
  return say1 > say2 ? say1 : say2;
}
```

브라우저에서 이것을 실행하려고하면 아직 2 가지 더해야 할 일이 있습니다.  
html 스크립트 태그의 type을 모듈로 선언해야하며 파일은 서버에서 제공되어야합니다.  
npm의 live-server와 같은 패키지를 사용하여 자체 서버를 가동 할 수 있습니다.

`<script type="module" src="'./script.js'></script>`

---

#### **ERROR HANDLING**

개발자로서 배워야 할 가장 중요한 것 중 하나는 오류를 해결하는 방법입니다.  
오류 처리 방법을 배우면 더 나은 프로그래머가됩니다.  
프로그램을 작성할때 **throw** 키워드를 사용하여 프로그램을 중지하고 선택적인 **finally** 블록이있는 **try / catch** 블록 또는 비동기 코드의 **.catch ()** 메서드를 사용하여 오류를 처리 할 수 ​​있습니다.

```js
throw new Error();

// synchronous try/catch/finally block
function fail() {
  try {
    console.log('this works');
    throw new Error('oopsie!!!');
  } catch (error) {
    console.log('we have made an oopsie', error);
    // error.name / error.message / error.stack ⭐
  } finally {
    console.log('still good');
  }
}

fail();
// this works // because it goes line by line
// we have made an oopsie Error: oopsie!!! at fail
// still good
```

```js
try {
  try {
    something();
  } catch (error) {
    throw new Error(error);
  }
} catch (error) {
  console.log('got it', error);
}
```

**Async Error Handling**

```js
Promise.resolve('asyncfail')
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.log(error);
  });

(async function () {
  try {
    await Promise.resolve('oopsie #1');
    await Promise.resolve('oopsie #2');
  } catch (error) {
    console.log(error);
  }
  console.log('is this still good?');
})();
```

일반 **Error** 생성자 외에도 7 개의 다른 기본 제공 오류 생성자가 있습니다.

- EvalError - 전역 함수 eval ()에 오류가 있습니다
- InternalError - JavaScript 엔진에서 오류가 발생합니다. 일반적으로 무언가가 너무 클 때.
- RangeError - 숫자 변수 또는 매개 변수가 유효한 범위를 벗어난 경우 오류입니다
- ReferenceError - 잘못된 것을 참조 할 때 발생하는 오류입니다. 예 : 변수가 선언되기 전에 사용되는 경우.
- SyntaxError - 구문 분석에서 발생하는 오류, 엔진은 작성된 내용을 이해하지 못합니다.
- TypeError - 변수가 올바른 유형이 아닌 경우 오류.
- URIError - encodeURI () 또는 decodeURI ()가 잘못된 매개 변수를 전달할 때 오류입니다.

new 키워드를 사용하여 생성 된 오류에는 3 개의 속성이 있습니다.

- name - 오류의 이름입니다.
- message - 오류에 제공된 parameter(매개 변수)입니다.
- stack - 오류가 발생한 줄과 문자 번호를 포함하는 오류 발생시 stack trace 또는 callback queue.

```js
const myError = new Error('oopsie');

myError.name; // "Error"
myError.message; // "oopsie"
myError.stack; // "Error: oopsie at <anonymous>:1:17

function a() {
  const b = new Error('uh oh');
  return b;
}

a(); // b().stack
// Error: uh oh
// at a (<anonymous>:2:12)
// at <anonymous>:1:1
```

Error는 생성자 함수이므로이를 확장하여 추가 할 수 있습니다.  
오류가 발생할 수있는 불량 행위자에게 stack trace 및 기타 정보를 제공하여 프로그램의 일부를 드러내고 싶지 않습니다.  
따라서 오류를 표시 할 내용을 사용자 지정할 수 있습니다.

```js
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.message = 'authentication problem';
    this.fix = 'please log in';
  }
}

const err = new AuthenticationError('oopsie');
err; // authenticationError: "authentication problem" stack trace
err.fix; // please log in
```

---

### **Data Structures In JavaScript**

#### **Data Structure**🍕

**a collection of data values**  
**자료구조는(Data Structure) 서비스나 어플리케이션에서 필요한데이터를 메모리에 어떻게 구조적으로 잘정리해서 담아두고 관리하고**  
**최종적으로 가장 효율적인 방식으로 필요한데이터에 빠르게접근(search)하고 수정(modify) 삽입(insert) 삭제(delete) 할수있도록 도와줍니다.**

1. How to Build One
2. **How to Use it** ⭐

Key points❓

- **Order** - 자료구조안에있는 데이터들의 순서가보장이되는지❓
- **Unique** - 중복된 데이터가 들어갈수있는지❓
- **Search** - 검색할때 얼마나 효율적인지❗
- **Modification** - 수정(원하는기능에따라)할때 얼마나 효율적인지❗

Array(메모리에 연속적으로 저장되어있는 값, j = 5 같이 한개의 변수에 한개의값을 저장하는것 대신 여러개의 숫자를 지정한다음 배열에저장할수있습니다)  
,단일연결List, 이중연결List, Stack, Hash table 등이있다.

연결List는 크기를 상황에 따라서 늘이거나 줄일수있습니다.
연결List는 쉽게 순서를바꾸거나, 간략화, 쪼개기, 뒤집기등이 가능합니다.
가장유명하고 보편적인 큐(FIFO)-줄, 스택(LIFO)-팬케익

이진트리❗
노드 구조체를 포인터한개대신 두개를 갖게한다면 트리구조를만들수있다.
한노드는 두개까지의 자식을 가질수있다.

하지만 상황에맞게 자료구조를 수정함으로써 트리의 자식노드수를 3이나 4또는 임의의수로 늘릴수있습니다.

무한루프와 같이 제멋대로 연결되는 자료들은 그래프 자료구조를 사용합니다.

**각각 다른 자료구조는 특정 계산에 유용한 속성을 가지고 있습니다**

많은 프로그래밍 언어는 라이브러리에 이미 만들어진 자료구조들로 가득차있다

#### **Algorithm**🍗

**DATA PROCESSING**  
**within a finite amount of space and time**

**알고리즘은 제한된 공간과 시간안에서 데이터를 어떻게 처리할것인지를 정해놓은 로직**  
**즉, 주어진 INPUT으로 정의된 계산을수행한다음에 OUTPUT(결과값)을 내는것**

**Big O**⭐  
**동일한 알고리즘의 로직으로 INPUT의사이즈가 점점 커질수록 시간이 얼마나더많이 걸리느냐를 정의한 시간복잡도를 표기할수있는 방법이다.**

주어진데이터를 검색(search)하거나 정렬(sort), 총점(sum)을 구하는등의 다양한계산을 할수있는것.

Key points❓

- **Input Size** - Input의 Size가 커질수록 Big O가 어떻게변화하는지❗
- **공간(Space)과 시간(Time)의 복잡도는 어떤지❗**
- 어떤**Data Structure**를 이용해서 이알고리즘을 쓰는게 좋은지❗

**제일 좋은알고리즘은 제공된 데이터를 정말 작은공간과 빠른시간안에서 효율적(Efficient)으로 처리할수있는것**

---

### **목표: 자료구조 이해하고 문제에따른 올바른 자료구조를 고를수있다⭐**

What is a Data Structure ❓

**각각 다른 자료구조는 특정 계산에 유용한 속성을 가지고 있습니다**

자료구조는 다른 유형의 파일 캐비닛(백팩, 냉장고, 파일, 상자..)
각각의 컨테이너는 그 자체로 유용합니다.

Which code is best ❓

- Readable
- Memory (Space Complexity)
- Speed (Time Complexity)

understanding data structures

1. How to Build One
   (How can we build with code some of these data structures)
2. **How to Use it** ⭐

다양한 시나리오에 따라 데이터를 특정 형식으로 저장해야합니다.

우리의 목표는 CPU가 정보를 얻기 위해 수행해야하는 작업을 최소화하는 것입니다.
그것이 데이터 구조가 강력한 이유입니다

**Data Structures**

- Arrays
- Stacks
- Queues
- Linked Lists
- Trees
- Tries
- Graphs
- Hash Tables

**Algorithms**

- Sorting
- Dynamic Programming
- BFS + DFS (Searching)
- Recursion

서로 다른 data structures에서 수행 할 수있는 다양한 작업은 무엇입니까?  
data structures는 단순히 데이터를 구성하는 방법이기 때문입니다.  
각 data structures에는 장단점이 있습니다.  
자료구조로 수행 할 작업 유형은

- 삽입(insertion)
- 삭제(Deletion)
- 순회(Traversal)
- 검색(Searching)
- 정렬(Sorting)
- 접근(access)⭐

**Array**

```js
const strings = ['x', 'a', 'b', 'c', 'd'];
//     0    1    2    3
// 4x4 = 16 bytes of storage

strings[2]; // O(1)

// push
strings.push('e'); // O(1)

// pop
strings.pop(); // O(1)

// unshift
strings.unshift('x'); // O(n) depending on the size of array

// splice
strings.splice(2, 0, 'alien'); // O(n/2) = O(n)
// remember our rules when it comes to big O we remove constants and simplify to just O(n)
```

**Static vs Dynamic Arrays**

**Implementing An Array**

```js
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];
    this.shiftItems(index);
  }

  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}

const newArray = new MyArray();
newArray.push('hi');
newArray.push('you');
newArray.push('!');
// newArray.pop();
newArray.delete(1);
// for (let i = 1; i < 2; i++) {
// this.data[1] = this.data[2]
// }
console.log(newArray);
```

**Exercise: Reverse A String**

```js
//Create a function that reverses a string:
//'Hi My name is Andrei' should be:
//'ierdnA si emdn yM iH'

function reverse(str) {
  // check input
  if (!str || str.length < 2 || typeof str !== 'string') {
    return 'that is not good';
  }

  const backwards = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    backwards.push(str[i]);
  }
  console.log(backwards);

  return backwards.join('');
}

function reverse2(str) {
  return str.split('').reverse().join('');
}

const reverse3 = (str) => str.split('').reverse().join('');
const reverse4 = (str) => [...str].reverse().join('');

reverse('Hi My name is Andrei');
```

**Exercise: Merge Sorted Arrays**

```js
// mergeSortedArrays([0,3,4,31], [4,6,30]);
// [ 0, 3, 4, 4, 6, 30, 31 ]

function mergeSortedArrays(array1, array2) {
  const mergedArray = [];
  let array1Item = array1[0];
  let array2Item = array2[0];
  let i = 1;
  let j = 1;

  //Check input
  if (array1.length === 0) {
    return array2;
  }
  if (array2.length === 0) {
    return array1;
  }

  while (array1Item || array2Item) {
    if (!array2Item || array1Item < array2Item) {
      mergedArray.push(array1Item);
      array1Item = array1[i];
      i++;
    } else {
      mergedArray.push(array2Item);
      array2Item = array2[j];
      j++;
    }
  }

  return mergedArray;
}
```

**When you should use array❓**⭐

         😘

- Fast lookups
- Fast push/pop
- Ordered

      🤢

- Slow inserts
- Slow deletes
- Fixed Size (if using static array)

**Hash Tables (objects in js)**

**Hash Function**  
hash function is simply a function that generates  
a value of fixed length for each input that it gets.  
임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수이다

idempotent(멱등법칙): 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질

```js
let user = {
  age: 54,
  name: 'kylie',
  magic: true,
  scream: function () {
    console.log('ahhhh');
  },
};

user.age; // O(1)
user.spell = 'abra kadabra'; // O(1)
user.scream(); // O(1)

// object you can only save the key as a string
const a = new Map();
// map allows you to save any data type as the key.
// And another benefit of map is that it maintains insertion order.
const b = new Set();
// The only difference is that it only stroes the keys no values
```

**Exercise: Implement A Hash Table**

```js
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  // That is properties that i can't access outside of this class.
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
      // console.log(hash)
    }
    return hash;
  }

  // create set
  set(key, value) {
    let address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
    return this.data;
  }

  get(key) {
    let address = this._hash(key);
    const currentBucket = this.data[address];
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    } // O(1)
    return undefined;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0]);
      }
    }
    return keysArray;
  }
}

const myHashTable = new HashTable(50);
myHashTable.set('grapes', 10000);
myHashTable.set('apples', 54);
myHashTable.set('oranges', 21);
myHashTable.keys();
```

**Hash Tables vs Arrays**  
 Arrays

- search O(n)
- lookup O(1)
- push O(1)
- insert O(n)
- delete O(n)

  Hash Tables

- search O(1)
- insert O(1)
- lookup O(1)
- delete O(1)

**Exercise: First Recurring(되풀이) Character**

```js
//Google Question
//Given an array = [2,5,1,2,3,5,1,2,4]:
//It should return 2

//Given an array = [2,1,1,2,3,5,1,2,4]:
//It should return 1

//Given an array = [2,3,4,5]:
//It should return undefined


function firstRecurringCharacter(input)
}

//Bonus... What if we had this:
// [2,5,5,2,3,5,1,2,4]
// return 5 because the pairs are before 2,2
```

**Solution: First Recurring Character**

```js
function firstRecurringCharacter(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] === input[j]) {
        return input[i];
      }
    }
  }
  return undefined;
} // O(n^2)

// Using hash tables
function firstRecurringCharacter2(input) {
  let map = {};
  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      return input[i];
    } else {
      map[input[i]] = i;
    }
  }
  return undefined;
} // O(n)

firstRecurringCharacter2([2, 5, 1, 2, 3, 5, 1, 2, 4]);
```

**Hash Tables**

          😘

- Fast lookups  
  (But remember we need a good collision resolution needed.)
- Fast inserts
- Flexible Keys

      🤢

- Unordered
- Slow Key iteration

질문!!! 언제 hash table?  
**by using hash table to optimize nested loops O(n^2) => O(n)** 👍

**0,1,2같은 숫자인덱스만을 가지는 배열대신에**  
**map같은 hash tables 타입에따라 flexible keys 가질수있다**

Improve Time Complexity❓ => Fast Access O(1), tradeoff: more memory O(n)

---

---

#### Http, Https, Web APIs, 브라우저좌표

#### defer, DOMContentLoaded, load, unload

#### **Bubbling & (capturing) event.stop(Immediate)Propagation ❌** ,

**부모 컨테이너는 어떤 자식 요소에서 이벤트가 발생하든 모든 이벤트를 다 들을수가 있다** ⭐

#### 이벤트위임

**부모 컨테이너는 어떤 자식 요소에서 이벤트가 발생하든 모든 이벤트를 다 들을수가 있다** ⭐

```js
const ul = document.querySelector('ul');
ul.addEventListener('click', (event) => {
  if (event.target.tagName == 'LI') {
    event.target.classList.add('selected');
  }
});
```

#### 웹APIs는 TaskQueue(FIFO)에 콜백함수를 넣어준다 -> 이벤트루프가 TaskQueue와 콜스택을 관찰하며 콜스택이 비워지면 콜스택에 TaskQueue에있는 콜백함수를 넣어준다.

#### MicroTaskQueue 에는 Promise의then 등록된콜백과 mutaionObserver에 등록된 콜백이들어온다

#### Render는 브라우저에서 변형한코드가 주기적으로 업데이트되기위해 주기적으로 호출되는 순서인데 그전에 requestAnimationFrame이라는 api를 부르면 그때등록한 콜백은requestAnimationFrameQueue에 차곡차곡 쌓인다

#### 클래스안에있는 함수를 다른콜백으로 전달해줄때는 클래스정보가 무시되므로 함수를 클래스와 Binding해주거나 화살표함수

#### Builder Pattern

---

#### 렌더링 순서

**HTMLrequest/response->HTML을한줄씩DOM요소로변환,CSS을CSSOM으로변환->RenderTree만들기->layout(요소배치)->paint(레이어단위로 페인트를준비)->composition**

---

#### Intermediate Javascript

**Advanced Arrays**

```js

```

```js
let array = [1, 2, 3];

const newArray = array.map((num) => {
  num * 2;
});

// [undefined, undefined, undefined]
// 리턴 or 한줄로 자동리턴
```

#### ES 8

```js
let obj = {
  username0: 'Santa',
  username1: 'Rudolf',
  username2: 'Mr.Grinch',
};

const newObj = Object.keys(obj).forEach((key, index) => {
  console.log(key, obj[key], index);
});

Object.values(obj).forEach((value) => {
  console.log(value);
});

Object.entries(obj).forEach((value) => {
  console.log(value);
});

Object.entries(obj).map((value) => {
  return value[1] + value[0].replace('username', '');
});

// 백엔드에서 받아온 data를 가공하기💝
```

#### ES9 + ES8 Async Await and Asyncronous JavaScript

다시듣기

#### ES10

```js
const entries = ['bob', 'sally', , , , , , , , 'cindy'];
entries.flat(n);

entries.flatMap((name) => name + '💝');
```

```js
userEmail = '         zowoz8819@gmail.com';
userEmail2 = 'zowoz8819@gmail.com';
console.log(userEmail.trimStart());
console.log(userEmail2.trimEnd());
```

```js
const userProfiles = [
  ['commanderTom', 23],
  ['derekZlander', 40],
  ['hansel', 18],
];

const obj = Object.fromEntries(userProfiles);
// {commanderTom: 23, derekZlander: 40, hansel: 18}

Object.entries(obj);
//  [['commanderTom', 23], ['derekZlander', 40], ['hansel', 18]]
```

```js
try {
  bob + 'hi';
} catch (error) {
  console.log('you messed up', error);
}
```

#### Advanced Loop

```js
const basket = ['apples', 'oranges', 'grapes'];
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000,
};

// 1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

// 2
basket.forEach((item) => {
  console.log(item);
});

// 3. for of
// Iterating 반복 - arrays, strings
for (item of basket) {
  console.log(item);
}

for (item of 'basket') {
  console.log(item);
}

// 4. for in - properties
// enumerating 열거 - objects
for (item in detailedBasket) {
  console.log(item);
}
```

#### ES2020(ES11)

- BigInt
- Optional Chaining Operator:
  `console.log(person.job?.manager?.name);`

```js
let andrei_poketmon = {
  laichu: {
    species: 'Mouse Poketmon',
    height: 0.8,
    weight: 30,
  },
};

let weight2 = andrei_poketmon.pikachu.weight;
console.log('weight:', weight); // Error

if (andrei_poketmon.pikachu && andrei_poketmon.pikachu.weight) {
  let weight2 = andrei_poketmon.pikachu.weight;
} else {
  let weight2 = undefined;
  console.log('weight:', weight);
}

let weight3 = andrei_poketmon?.laichu.weight;
```

- Nullish Coalescing Operator

```js
{
  // Logical OR operator
  // false: false, '', 0, null, undefined, NaN
  {
    const name = 'Ellie';
    const userName = name || 'Guest';
    console.log(userName) // Ellie
  }

  {
    const name = null;
    const userName = name || 'Guest';
    console.log(userName) // Guest
  }

  💥
  {
    const name = '';
    // 아무런 이름도 사용하고싶지않지만 Guest가 할당되는 버그
    const userName = name || 'Guest';
    console.log(userName) // Guest

    const num = 0;
    const message = num || 'undefined';
    console.log(message) // undefined
  }

  👍
  { // null, undefined 체크❗
    const name = '';
    const userName = name ?? 'Guest';
    console.log(userName)

    const num = 0;
    const message = num ?? 'undefined';
    console.log(message) // 0
  }
}

```

#### Debugging

```js
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((accumulator, array) => {
  debugger;
  return accumulator.concat(array);
}, []);
```

#### #### Modules

파일안에 코드를 모듈화해서 작성하는것  
한 모듈 = 한 파일안에 작성되어있는 코드  
모듈화해서 작성하지않으면 여러가지 파일들이있는경우 모든코드들은 글로벌스코프로 측정된다

#### how internet works

브라우저 -> who is this google.com fellow? -> ISP$ -> DNS(i don't know him personally, but here is his ip address 172.217.7.23)  
-> ISP -> 브라우저(172.217.7.23 but nothing is showing up yet)

브라우저 -> 172.217.7.23 ip address -> Google Servers -> HTML, CSS, JS to 브라우저

웹사이트 성능 요소

- Location of Server
- How Many Trips
- Size Of Files
