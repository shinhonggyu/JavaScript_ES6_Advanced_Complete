#### 중첩된 함수에서 자식의함수가 부모함수에 정의된 변수들에 접근이가능한 것들이 클로져
#### 스코프는 변수를찾는 규칙의집합
#### 렉시컬스코프, 글로벌스코프, 스코프체인, Function scope 와 Block scope
#### 자바스크립트 엔진
#### 인터프리터와 컴파일
#### 콜스택과 메모리힙
#### 이벤트루프
#### 가비지콜렉션
#### 메모리누수
#### 프로세스와 멀티쓰레드
#### JS 런타임
#### 렉시컬환경
#### 호이스팅
#### THIS, Bind
#### 타입
#### 클로저
#### 프로토타입
#### Object Oriented Programming
#### Functional Programming
#### Asyn
#### 모듈
#### Error Handling
•••

#### Http, Https, Web APIs, 브라우저좌표
#### defer, DOMContentLoaded, load, unload
#### HTMLrequest->DOM,CSSOM->RenderTree->layout->paint(레이어단위로 페인트를준비)->composition
#### Bubbling & (capturing) event.stop(Immediate)Propagation ❌ , 
#### 이벤트위임

#### 스택(함수들의 실행순서와 어디로 돌아가야하는지의 정보를담고있다) = LIFO(last in first out)
#### 힙(오브젝트를 생성하거나 데이터를 만들때 그데이터들이 저장되는 공간)
#### 프로세스(운영체제위에서 독립적으로 메모리에서 실행되고있는 프로그램, 코드-스택-힙-데이터로 구성) 
#### 쓰레드(프로그램 안에서 동시에 여러개가수행될수있는 작은 일꾼단위 -각각 고유스택을 가지고있고 프로세스의 코드-힙-데이터에 공통적으로 접근)
#### JS는 싱글쓰레드 이지만 JS가 동작하고있는 브라우저의 멀티쓰레딩인 WebAPIs 이용해 멀티쓰레딩이 가능하다
#### JS가 실행되는 런타임환경(실행환경) 위에서는 멀티쓰레딩과 이벤트루프를 이용할수있다

### JS + 브라우저 런타임(실행환경)⭐
### JS엔진에는메모리힙(할당된데이터들이저장) + 콜스택(함수들이 호출하는 순서를 기억했다가 함수가끝나면 원래있던자리로 돌아가기위해 쓰이는 LIFO자료구조)로 구성됨.
### 웹APIs는 TaskQueue(FIFO)에 콜백함수를 넣어준다 -> 이벤트루프가 TaskQueue와 콜스택을 관찰하며 콜스택이 비워지면 콜스택에 TaskQueue에있는 콜백함수를 넣어준다.
### MicroTaskQueue 에는 Promis의then 등록된콜백과 mutaionObserver에 등록된 콜백이들어온다
### Render는 브라우저에서 변형한코드가 주기적으로 업데이트되기위해 주기적으로 호출되는 순서인데 그전에 requestAnimationFrame이라는 api를 부르면 그때등록한 콜백은requestAnimationFrameQueue에 차곡차곡 쌓인다
### 이벤트루프는 콜스택에서 수행중인함수가있다면 끝날떄까지 머무른다 -> 60frames에 맞추어 주기적으로 Render를 업데이트해준다 -> MicroTaskQueue에 콜백함수가있다면 MicroTaskQueue가 빌떄까지 콜백함수를 콜스택으로 가지고와 수행함 -> TaskQueue에서는 한번에 하나의콜백만 가지고온다 -> 렌더업데이트시간이되면 -> requestAnimationFrame을 통해 등록된 콜백함수실행 -> RenderTree->layout->paint(레이어단위로 페인트를준비)->composition -> •••

#### 클래스안에있는 함수를 다른콜백으로 전달해줄때는 클래스정보가 무시되므로 함수를 클래스와 Binding해주기(화살표함수)
#### Builder Pattern
