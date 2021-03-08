#### 자바스크립트 엔진💖

- JavaScript 엔진은 JavaScript 코드를 제공하는 컴퓨터 프로그램으로 컴퓨터에 실행 방법을 알려줍니다.
- 엔진 내부에서는 어떤 일이 발생하는지는 엔진에 달려 있습니다

![Image description](https://images.ctfassets.net/aq13lwl6616q/3o7Q3edCrVJG9Zzj6VMZ1K/28136a643636dfa04090f3fb5c5467ff/javascript_engine.png)

`Google이 Chrome V8 엔진을 만든 2008년은 JavaScript의 중요한 순간이었습니다.`  
`V8 엔진은 C ++로 작성되고 Chrome 브라우저에서 사용되며 Node JS를 지원하는 오픈 소스 고성능 JavaScript 엔진입니다`  
`성능은 주로 엔진의 두 부분 인 인터프리터와 컴파일러를 결합하기 때문에 이전에 나온 엔진을 능가했습니다.`  
`오늘날 모든 주요 엔진은이 동일한 기술을 사용합니다.`

---

파싱은 소스 코드를 분석하고 오류를 확인한 다음 부분으로 나누는 프로세스입니다.  
파서는 Abstrack Syntax Tree(추상 구문 트리) or AST라 불리는 자료구조를 생성합니다  
AST는 원본 구문의 모든 세부 사항을 표시하지는 않지만 구조적 또는 콘텐츠 관련 세부 사항을 포함하는 소스 코드의 트리 그래프

#### 인터프리터와 컴파일❗

- 인터프리터는 기계 언어 프로그램으로 컴파일 할 필요없이 코드의 각 줄을 한 줄씩 직접 실행합니다.
- Interpreters can use different strategies to increase performance.
- 그들은 소스 코드를 파싱하고 즉시 실행할 수 있으며,이를보다 효율적인 기계 코드로 변환하거나, 컴파일러로 만든 미리 컴파일 된 코드를 실행하거나, 이들의 일부 조합을 실행할 수 있습니다.
- 컴파일러는 컴퓨터에서 읽고 실행할 수 있도록 미리 명령을 기계 코드 또는 하위 수준 형식으로 변환합니다.
- 모든 코드를 실행하고 코드의 기능을 파악한 다음 컴퓨터가 읽기 쉬운 다른 언어로 컴파일합니다.(Babel, TS)
- 현대 엔진에서 인터프리터는 코드를 한 줄씩 읽기 시작하고 프로파일 러는 자주 사용되는 코드와 플래그를 감시 한 다음 최적화를 위해 컴파일러에 전달합니다.
- 결국 JavaScript 엔진은 인터프리터가 출력하는 바이트 코드를 가져와 컴파일러가 출력하는 최적화 된 코드를 혼합 한 다음이를 컴퓨터에 제공합니다. 이를 "Just in Time"또는 JIT 컴파일러라고합니다.

---

#### 컴파일러가 최적화하는데 도움이되는 코드 작성하기❗

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

#### 메모리힙과 콜스택(LIFO)⭐

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

#### Synchronous

`So, what is the issue with being a single threaded language❓`  
Lets's start from the beginning.
When you visit a web page, you run a browser to do so (Chrome, Firefox, Safari, Edge).  
Each browser has its own version of JavaScript Runtime with a set of Web API's, methods that developers can access from the window object.  
In a synchronous language, only one thing can be done at a time.  
Imagine an alert on the page, blocking the user from accessing any part of the page until the OK button is clicked.  
If everything in JavaScript that took a significant amount of time, blocked the browser, then we would have a pretty bad user experience  
`this is where concurrency and the event loop come in.`

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

#### JS 런타임⭐ Playground [here](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

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

#### 1. EXECUTION CONTEXT

실행 컨텍스트(Execution Context)는 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리  
JavaScript의 코드는 항상 일종의 실행 컨텍스트 내에서 실행됩니다  
실행 컨텍스트(EXECUTION CONTEXT)는 단순히 코드가 실행되는환경 입니다  
JavaScript에는 Global 또는 Function의 두 가지 유형의 실행 컨텍스트가 있습니다  
각 컨텍스트에는 생성단계(creation phase) 및 실행단계(executing phase)의 두 단계가 있습니다  
JavaScript 엔진이 코드를 읽기 시작하면 Global Execution Context라는 것이 생성됩니다.

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

#### LEXICAL ENVIRONMENT ❓

- _lexical environment은 기본적으로 엔진이 현재 코드를 읽고있는 scope(범위) 또는 environment(환경)입니다._
- _중괄호 {}를 사용하면 new lexical environment이 생성되며 중첩 된 괄호 {{...}}도 new lexical environment을 생성합니다._
- _그러므로 들여쓰기 없는함수의 lexical environment는 global scope_
- _실행 컨텍스트(EXECUTION CONTEXT)는 엔진에게 현재 작업중인 lexical environment을 알려주고 lexical scope는 사용 가능한 변수를 결정합니다._
- _in Javascript our lexical scope (available data + variables where the function was defined) determines our available variables._
- _Not where the function is called (dynamic scope), So it doesn't matter where we call our function._

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

#### Function And Block scope 💖

ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다.  
var 키워드로 선언된 변수는 아래와 같은 특징이 있다. 이는 다른 언어와는 다른 특징으로 주의를 기울이지 않으면 심각한 문제를 일으킨다.

1. `함수 레벨 스코프(Function-level scope)`

   - `함수의 코드 블록만을 스코프(우리가 접근할수있는 변수) 로 인정한다. === Block scope를 무시한다`  
     따라서 전역 함수 외부에서 생성한 변수는 모두 전역 변수이다. 이는 전역 변수를 남발할 가능성을 높인다
   - for 문의 변수 선언문에서 선언한 변수를 for 문의 코드 블록 외부에서 참조할 수 있다.

2. var 키워드 생략 허용

   - 암묵적 전역 변수를 양산할 가능성이 크다.

   ```js
   'use strict';

   age = 4;
   console.log(age); // error
   ```

3. 변수 중복 선언 허용

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

4. `변수 호이스팅`

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

`함수 레벨 스코프(Function-level scope)`  
`함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.`  
`즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.`

`블록 레벨 스코프(Block-level scope)`  
`모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다. 즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.`

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

#### THIS - 1

JS이외의 다른 OOP언어에서 THIS는 클래스자신이지만 JS에서 THIS란 만들어진객체 자기자신을가리키는것이 아닌 누가부르냐에따라(호출부) 달라진다.  
JS는 THIS라는 정보를담은 함수를 다른곳으로 할당하는순간 잃어버릴수있기때문에 Bind 또는 Class안에서 Arrow함수⭐로 선언해줌에따라 선언될당시 this에 바인딩할 객체가 정적으로 결정!  
*화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다. 이를 Lexical this*라한다.  
일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

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

#### THIS - 2

`This is the object that the function is a property of`

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

#### 스코프(SCOPE)

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

#### 스코프 - 렉시컬 스코프 vs 다이나믹 스코프

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

---

#### 중첩된 함수에서 자식의함수가 부모함수에 정의된 변수들에 접근이가능한 것들이 클로져

#### 타입(JS런타임때 결정)

#### 클로저활용

#### 프로토타입

#### Object Oriented Programming

#### Functional Programming

#### Asyn

#### 모듈

#### Error Handling

#### 자료구조 in JS

---

#### Http, Https, Web APIs, 브라우저좌표

#### defer, DOMContentLoaded, load, unload

#### HTMLrequest->DOM,CSSOM->RenderTree->layout->paint(레이어단위로 페인트를준비)->composition

#### Bubbling & (capturing) event.stop(Immediate)Propagation ❌ ,

#### 이벤트위임

#### 스택(함수들의 실행순서와 어디로 돌아가야하는지의 정보를담고있다) = LIFO(last in first out)

#### 힙(오브젝트를 생성하거나 데이터를 만들때 그데이터들이 저장되는 공간)

#### JS가 실행되는 런타임환경(실행환경) 위에서는 멀티쓰레딩과 이벤트루프를 이용할수있다

### JS + 브라우저 런타임(실행환경)⭐

#### JS엔진에는메모리힙(할당된데이터들이저장) + 콜스택(함수들이 호출하는 순서를 기억했다가 함수가끝나면 원래있던자리로 돌아가기위해 쓰이는 LIFO자료구조)로 구성됨.

#### 웹APIs는 TaskQueue(FIFO)에 콜백함수를 넣어준다 -> 이벤트루프가 TaskQueue와 콜스택을 관찰하며 콜스택이 비워지면 콜스택에 TaskQueue에있는 콜백함수를 넣어준다.

#### MicroTaskQueue 에는 Promise의then 등록된콜백과 mutaionObserver에 등록된 콜백이들어온다

#### Render는 브라우저에서 변형한코드가 주기적으로 업데이트되기위해 주기적으로 호출되는 순서인데 그전에 requestAnimationFrame이라는 api를 부르면 그때등록한 콜백은requestAnimationFrameQueue에 차곡차곡 쌓인다

#### 클래스안에있는 함수를 다른콜백으로 전달해줄때는 클래스정보가 무시되므로 함수를 클래스와 Binding해주거나 화살표함수

#### Builder Pattern

#### Prototype💖 프로토타입(Inheritance:상속을 구현 할수있다, 속성과 함수들을 정의)을 기반으로해서 객체지향프로그래밍과 코드재사용 할수있다

#### behavior reuse 행동재사용(Inheritance) by reusing existing objects(기존에있는 오브젝트 재사용)

#### Modules💘이란 파일안에 코드를 모듈화해서 작성하는것/ 한 모듈 = 한 파일안에 작성되어있는 코드/ 모듈화해서 작성하지않으면 여러가지 파일들이있는경우 모든코드들은 글로벌스코프로 측정된다/ export, import 활용
