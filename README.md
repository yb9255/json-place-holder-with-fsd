# FSD Architecture Sample with JSON Placeholder

## Tree

- 이후 설명은 아래 트리구조를 기반으로 진행됩니다. 

<details>
<summary>Tree 펼쳐보기</summary>

```
src
├── app
│   ├── App.tsx
│   ├── index.css
│   ├── index.ts
│   ├── providers
│   │   ├── ReactQueryProvider.tsx
│   │   └── index.ts
│   └── routers
│       ├── AppRouter.tsx
│       └── index.ts
├── entities
│   ├── post
│   │   ├── api
│   │   │   └── index.ts
│   │   └── model
│   │       └── index.ts
│   └── user
│       ├── api
│       │   └── index.ts
│       └── model
│           └── index.ts
├── features
│   └── create-post
│       ├── api
│       │   └── index.ts
│       ├── model
│       │   └── index.ts
│       └── ui
│           ├── CreatePostModal.tsx
│           ├── CreatePostModalForm.tsx
│           └── index.ts
├── main.tsx
├── pages
│   ├── home
│   │   ├── index.ts
│   │   └── ui
│   │       ├── HomePage.tsx
│   │       └── index.ts
│   ├── post
│   │   ├── index.ts
│   │   └── ui
│   │       ├── PostComments.tsx
│   │       ├── PostPage.tsx
│   │       ├── PostUserInfo.tsx
│   │       └── index.ts
│   ├── posts
│   │   ├── index.ts
│   │   └── ui
│   │       ├── PostCard.tsx
│   │       ├── PostsPage.tsx
│   │       └── index.ts
│   ├── user
│   │   ├── index.ts
│   │   └── ui
│   │       ├── UserPage.tsx
│   │       └── index.ts
│   └── users
│       ├── index.ts
│       └── ui
│           ├── UserListItem.tsx
│           ├── UsersPage.tsx
│           └── index.ts
├── shared
│   ├── api
│   │   ├── base
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── lib
│   │   └── style
│   │       ├── cn.ts
│   │       └── index.ts
│   ├── routes
│   │   └── index.ts
│   └── ui
│       ├── Avatar.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Form.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── Spinner.tsx
│       └── index.ts
├── vite-env.d.ts
└── widgets
    └── layout
        └── ui
            ├── GlobalNavBar.tsx
            ├── MainLayout.tsx
            └── index.ts
```
</details>

## layer, slice와 segment

### layer
- layer는 **FSM을 구성하는 구조적인 위계 질서를 표현하는 개념**입니다. 가장 아래의 Shared부터 시작해서 최상단 App Layer까지 총 7가지 레이어로 구성되어 있습니다. 자세한 내용은 아래 하술합니다.

### slice
- slice는 layer 하단에 위치하는, **비즈니스 도메인별로 코드를 분류하는 폴더**입니다. 비즈니스 도메인별로 응집력을 높이면서, 각 파일의 커플링을 줄이기 위한 목적을 가집니다.
  - 예를 들자면 entities 레이어 아래에 게시글을 관리하는 코드를 분리하고 싶다면 `post` slice를, 사용자를 관리하는 코드를 분리하고 싶다면 `user` slice를 우선 만들어야 합니다.
- `app`과 `shared` 레이어를 제외한 모든 레이어는 slice를 가지고 있어야 합니다.
- 모든 slice는 다른 slice에서 참조할 수 있는 Public API의 정의를 가져야 합니다.
  - 여기서 Public API는 서버 API가 아닌, 참조할 수 있도록 공개된 컴포넌트, 타입, 메소드 등을 전부 포함하는 단어입니다.
  - Public API 컨벤션에 대한 내용은 아래에 더 자세히 하술합니다.
- 모든 slice는 다른 slice에서 Public API만 참조할 수 있으며, Public하지 않은 다른 slice의 코드를 참조할 수 없습니다.
- slice는 비즈니스 도메인 내에서 코드가 서로 분류되어야 한다면, slice 내부에 다른 slice를 가질 수 있습니다. 이를 `slice groups`라고 부릅니다.
  - e.g.) post slice 내 like / compose등이 있을 수 있습니다.
  - 절대로 하위 slice 전체를 sharing하는 index.ts 파일 등은 만들어서는 안됩니다. 

### segment
- segment는 slice 하단에 위치하는, **기능별로 코드를 분류하는 폴더**입니다.
- segment 이름은 정해진 규칙이 있는 것은 아니지만, FSD에서 공식 문서에서 권장하는 이름은 다음과 같습니다.
  - 공통: ui / api / model / lib / config
  - shared layer에서 추천되는 이름: routes / i18n
  - app layer에서 추천되는 이름: routes / store(전역 상태 관리 시 한정) / styles / entrypoint(entry point가 필요한 프레임워크 한정)
- segment의 이름은 **코드의 목적**을 기준으로 붙여야 하며, **코드의 분류별로 이름을 붙이지 않습니다.**
  - 추천: ui / api / model / config...
  - 추천하지 않음: components / types / hooks...

## 모든 레이어에 적용되는 중요 규칙

1. 기본적으로, 각 레이어는 오직 자신의 위치한 레이어보다 아래에 있는 slice만 import 할 수 있습니다.
   - <details>
     <summary>예시</summary>


     위의 트리 구조 기준으로
     
     - `widgets/ui`내 파일은 **자신이 위치한 레이어보다 하위 레이어 slice인** `entities/post`, `entities/user`, `features/create-post`에 모두 접근할 수 있습니다.
     - `entities/post`내 파일은 `shared`의 파일에 접근할 수 있지만, `entities/user`는 **자신이 위치한 레이어와 같은 위치의 slice이므로** 접근할 수 없습니다.
     - `entities/post`내 파일은 **자신이 위치한 레이어보다 상위 레이어 slice인** `features/create-post`, `widgets/ui`에 접근할 수 없습니다.
   </details>

2. 기본적으로, 각 segment 내 파일은 같은 slice의 다른 segment 파일에 접근할 수 있습니다.
   1. 예시: `entities/post/api`내 파일은 같은 slice 내 다른 segment인 `entities/post/model`에는 접근할 수 있으며, 그 반대도 마찬가지입니다.

3. `App`과 `Shared` 레이어는 1, 2번 법칙의 예외입니다.
   1. 이 두 레이어는 **레이어이자 slice 역할을 동시에 하기 때문입니다**
   2. `App`은 모든 비지니스 도메인을 통합해야 하기 때문에 같은 레이어의 폴더가 서로를 참조할 수 밖에 없습니다.
   3. `Shared`는 별개의 비즈니스 도메인을 가지지 않기 때문에 slice를 역할이 필요하지 않습니다. 
   4. 예시: `shared/ui`는 `shared/api`, `shared/lib`, `shared/config` 등에 자유롭게 접근할 수 있으며, 그 반대도 마찬가지입니다.

4. 합당한 사유로 2번 규칙을 지키지 못하는 경우 `cross-imports Public API`를 사용합니다. 이 내용은 Public API 컨벤션에서 더 자세히 다룹니다.

## 각 레이어별 역할 정의

### 들어가기에 앞서
- [FSD 공식 홈페이지에서 제공하는 샘플 사이트](https://feature-sliced.github.io/documentation/examples)에서도 파일 배치가 서로 다릅니다. 각 사이트를 참고하여 임의로 가장 적당하다고 생각되는 사례만 참고했습니다.
- Layer 1 -> Layer 7으로 갈수록 상위 레이어이며, 상위 레이어는 하위 레이어를 참고할 수 있습니다.

### Shared (Layer 1)
Shared layer는 다음과 같은 특징을 가집니다.

- **shared 내 파일은 특정 비즈니스 도메인에 절대 종속되어서는 안됩니다.** 따라서, **slice의 역할을 하는 폴더가 존재하지 않습니다.**
- slice가 없기 때문에 shared 내 폴더는 바로 segment가 되며 각 폴더끼리 공유가 가능합니다. 공식 문서에서 언급하는 Shared 내 주요 segment는 다음과 같습니다.
  - api: 공용으로 사용하는 API Client입니다. axios, ky등 사용하는 리퀘스트 라이브러리의 base instance를 생성하는 파일 등이 이 곳에 위치할 수 있겠습니다.
    - 현재 프로젝트에서 tanstack-query의 client는 이곳이 아닌 app layer에서 생성하고 있습니다. 해당 클라이언트는 provider의 맥락에 더 맞다고 여겼기 때문입니다. 
  - ui: 비즈니스 로직과 전혀 상관없는 headless-ui가 위치합니다. shadcn과 같은 외부 headless-ui 컴포넌트도 해당 폴더 내 위치합니다.
    - 회사 로고와 같은 business-themed의 경우 괜찮습니다.
  - lib: 내부 라이브러리들이 위치합니다. **이 곳을 hooks나 helpers처럼 사용하면 안됩니다.** hooks와 helpers가 커지면 어떤 함수가 있는지 확인이 어렵기 때문입니다.
    - 대신, lib/style, lib/test와 같이 관련된 역할이 정확히 명시된 하위 폴더 내 위치하여야 합니다.
    - lib 내부 함수는 모두 **`README.md`에 설명이 기록되어 있어야 합니다.**
  - config: 환경변수, 피처 플래그 등 설정 관련 값이 이곳에 위치합니다.
  - routes: route constants, route mapper 등이 위치하며, 일반적으로 이곳에서 route 컴포넌트를 직접 구현하지 않습니다.
    - 주로 여러 layer에서 라우트 관련 로직을 구현하기 위해 필요한 path, state 등을 생성해주는 코드가 이 폴더 내부에 위치합니다. 
  - i18n: 국제화 번역키 관련 코드가 이곳에 위치합니다.
- 이 외에도, graphql-codegen이나 swagger-typescript-api로 생성된 api 타입을 `shared/model` 내부에 저장한다던지, 다양한 segment가 위치할 수 있습니다.
  - 어떤 이름을 붙여도 자유지만 **코드의 목적**에 기반하여 이름을 붙여야 합니다.

### Entities (Layer 2)
Entities layer는 다음과 같은 특징을 가집니다.

- slice로 **앱이 다루는 현실 세계의 도메인**을 가집니다. e.g.) `entities/post`, `entities/user`...
- **해당하는 도메인의 정보를 직접 활용**하는 코드가 주로 이 레이어에 위치합니다. e.g.) 해당 도메인 정보를 획득하는 `GET` 메소드, 해당 도메인 정보를 시각화하는 ui
- 현실 세계의 도메인이 서로 밀접한 연관을 가질 수 있기 때문에, 중요 규칙 4번의 `cross-imports Public API`는 주로 이 레이어에서 이뤄집니다.
- 주로 가지는 segment는 다음과 같습니다.
  - ui: 해당 도메인의 정보를 시각화하는 컴포넌트가 위치합니다. e.g.) 전체 게시글 갯수를 보여주는 컴포넌트, 유저 증가 차트 컴포넌트 등
  - model: 해당 도메인 정보의 데이터 스키마(타입)를 가진 파일, 해당 도메인의 전역 상태를 모아두는 파일 등 도메인 정보에 대한 정의/메타데이터와 관련된 파일이 위치합니다.
    - Redux나 Zustand 등 전역 상태관리의 경우 `store` 폴더에 위치하는 경우도 있습니다.
  - api: 해당 도메인의 정보를 불러오는 API 실행 파일이 주로 있습니다. tanstack query의 query를 실행하는 hook이나, GET 메소드를 실행하는 파일이 주로 위치합니다.

### Features (Layer 3)
Features layer는 다음과 같은 특징을 가집니다.

- slice로 **사용자와 앱 간의 인터랙션**을 가집니다. e.g) `featers/create-post`, `features/update-post`...
- **모든 사용자간 인터랙션이 꼭 Features layer에 있을 필요는 없습니다.**, 간단한 인터랙션은 Pages Layer에 그대로 있어도 되며, Features는 여러 페이지에서 활용되는 인터랙션만 가지고 있는 것이 권장됩니다.
- 주로 가지는 segment는 다음과 같습니다.
  - api: GraphQL의 mutation, REST의 POST, PUT, PATCH, DELETE 등의 사용자 인터랙션으로 실행되는 리퀘스트가 주로 위치합니다.
  - model: 사용자 인터랙션으로 실행되는 리퀘스트의 데이터 스키마(타입)이 주로 위치합니다.
    - Entities와 마찬가지로, Redux나 Zustand등 전역 상태관리의 미들웨어를 통해 리퀘스트를 관리하는 경우, `store` 폴더에 위치하는 경우도 있습니다.
  - ui: form이나 form을 가지는 등 사용자 인터랙션의 대상이 되는 스타일 컴포넌트가 주로 위치합니다. 

### Widgets (Layer 4)
Widgets layer는 다음과 같은 특징을 가집니다.

- slice로 **혼자서 페이지 일부분의 역할을 전담할 수 있는 UI 블락 모음**을 가집니다.
- Entities, Features 등에 있는 UI들의 조합이 주로 오며, 혼자서 페이지 일부의 기능을 전담할 수 있어야 합니다.
- Features와 비슷하게, **모든 UI 조합이 꼭 Widgets layer에 포함될 필요는 없습니다.** 여러 UI의 조합이더라도 하나의 페이지에서만 사용된다면, 해당 페이지의 ui 폴더 내 위치하는게 좋습니다.

### Pages (Layer 5)
Pages layer는 다음과 같은 특징을 가집니다.

- slice로 **라우터별 페이지**를 가집니다. e.g.) `posts` 내 `PostsPage`는 `/posts`에 해당하고, `post` 내 `PostPage`는 `/posts/:postId` 페이지에 해당합니다.
- 현재 slice 내 페이지에서만 사용되는 ui의 경우 `features`, `widgets` 등에 배치하지 않고 이 라우터에서 처리하는게 좋습니다.
- 주로 가지는 segment는 다음과 같습니다.
  - ui: 로딩 / 에러 바운더리 등 페이지 단에서 처리하는 컴포넌트와 페이지 내부에서만 사용하는 컴포넌트가 위치합니다.
  - api: 페이지 단에서 호출하는 api를 다루는 파일이 위치합니다.

### ~~Processes (Layer 6)~~
- Deprecated된 Layer라서 링크로 설명을 대체합니다. [링크](https://feature-sliced.github.io/documentation/docs/reference/layers#processes)

### App (Layer 7)
App layer는 다음과 같은 특징을 가집니다.

- App layer 내 모든 파일은 하위 layer를 통합하는 역할을 합니다. **따라서 코드를 분리하는 역할을 하는 slice는 App layer에 존재하지 않습니다.**
- 주로 가지는 segment는 다음과 같습니다.
  - routes: 라우트 데이터 모델, 라우트 컴포넌트를 다루는 파일이 주로 위치합니다.
  - providers: 전역에 제공되는 provider가 주로 위치합니다.
  - store: 전역 상태관리 관련 config가 주로 위치합니다.
  - styles: 전역 스타일 관련 config가 주로 위치합니다.
  - entrypoint: 진입점을 요구하는 특정 프론트엔드 프레임워크에서 요구하는 파일이 이곳에 위치합니다.

## Public API

### 정의
- **`Private API`**
  - slice 내부에서만 사용되는 모든 코드를 총칭합니다.
  - 여기서 API는 컴포넌트, 훅, 헬퍼, 상수 등을 전부 포함합니다.
- **`Public API`**
  - slice 외부로 export 되어 다른 slice나 layer에서 사용되는 모든 코드를 총칭합니다.
 
### 좋은 Public API를 위한 Rules

- 리팩토링 등을 이유로 구조를 변경하는 과정에서 Private API가 Public API로 변경되지 않도록 해야 합니다.
- 기존 기능이 깨질 정도로 큰 변화가 slice에 있을 때, Public API도 변경될 수 있도록 해야 합니다.
- 반드시 노출되어야 하는 API만 Public API가 되어야 합니다.

- 이 룰을 지키기 위해서 많은 노력이 필요하지만, 그 중 barrel import 파일 (폴더 내 index.ts)에서 아래와 같이 전부 export하지 않는 것입니다.
  ```ts
  // ❌ BAD CODE BELOW, DON'T DO THIS
  export * from "./ui/Comment";  // 👎 don't try this at home
  export * from "./model/comments";  // 💩 this is bad practice
  ```

### cross-imports Public API
- 현실 세계에서 하나의 도메인을 설명하기 위해 다른 도메인이 필수적으로 필요한 경우가 있는 것처럼, 간혹 같은 layer 내 다른 slice를 참조하는게 필요할 수 있습니다. 이러한 상황은 주로 도메인 별로 slice를 구분하는 `Entities Layer`에서 주로 발생합니다.
- `slice`간 Public API를 주고받는 것은 최대한 제약을 걸어야 코드 출처의 흐름을 파악하기 용이하기 때문에, slice 내 `@x` 폴더를 생성하고 이 내부에 같은 layer의 slice간 주고받을 Public API를 위치합니다. 이렇게 공개된 Public API를 `cross-imports Public API`라고 합니다.
- e.g.) `entities/A` 코드 중 일부를 `entities/B`에서 참고하고 싶은 경우, A에서 같은 slice 내 `B`에게만 공개할 코드를 `entities/A/@x/B.ts(x)`에 위치한 다음, B에서 다음과 같은 형태로 import합니다.
  ```ts
  // inside entities/B
  import { somePublicAPIFromA } from '@/entities/A/@x/B';
  ```


