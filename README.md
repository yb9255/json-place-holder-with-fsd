# FSD Architecture Sample with JSON Placeholder

## Tree
<details>
<summary>Tree 펼쳐보기</summary>

```
src
├── app
│   ├── App.tsx
│   ├── index.css
│   ├── index.ts
│   ├── providers
│   │   ├── ReactQueryProvider.tsx
│   │   └── index.ts
│   └── routers
│       ├── AppRouter.tsx
│       └── index.ts
├── entities
│   ├── post
│   │   ├── api
│   │   │   └── index.ts
│   │   └── model
│   │       └── index.ts
│   └── user
│       ├── api
│       │   └── index.ts
│       └── model
│           └── index.ts
├── features
│   └── create-post
│       ├── api
│       │   └── index.ts
│       ├── model
│       │   └── index.ts
│       └── ui
│           ├── CreatePostModal.tsx
│           ├── CreatePostModalForm.tsx
│           └── index.ts
├── main.tsx
├── pages
│   ├── home
│   │   ├── index.ts
│   │   └── ui
│   │       ├── HomePage.tsx
│   │       └── index.ts
│   ├── index.ts
│   ├── post
│   │   ├── index.ts
│   │   └── ui
│   │       ├── PostComments.tsx
│   │       ├── PostPage.tsx
│   │       ├── PostUserInfo.tsx
│   │       └── index.ts
│   ├── posts
│   │   ├── index.ts
│   │   └── ui
│   │       ├── PostCard.tsx
│   │       ├── PostsPage.tsx
│   │       └── index.ts
│   ├── user
│   │   ├── index.ts
│   │   └── ui
│   │       ├── UserPage.tsx
│   │       └── index.ts
│   └── users
│       ├── index.ts
│       └── ui
│           ├── UserListItem.tsx
│           ├── UsersPage.tsx
│           └── index.ts
├── shared
│   ├── api
│   │   ├── base
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── lib
│   │   ├── cn.ts
│   │   └── index.ts
│   ├── routes
│   │   └── index.ts
│   └── ui
│       ├── Avatar.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Form.tsx
│       ├── Input.tsx
│       ├── Spinner.tsx
│       ├── index.ts
│       └── label.tsx
├── vite-env.d.ts
└── widgets
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
   3. `Slice`는 별개의 비즈니스 도메인을 가지지 않기 때문에 slice를 역할이 필요하지 않습니다. 
   4. 예시: `shared/ui`는 `shared/api`, `shared/lib`, `shared/config` 등에 자유롭게 접근할 수 있으며, 그 반대도 마찬가지입니다.

4. 합당한 사유로 2번 규칙을 지키지 못하는 경우 `cross-imports Public API`를 사용합니다. 이 내용은 Public API 컨벤션에서 더 자세히 다룹니다.

## 각 레이어별 역할 정의

### 들어가기에 앞서
- [FSD 공식 홈페이지에서 제공하는 샘플 사이트](https://feature-sliced.github.io/documentation/examples)에서도 파일 배치가 서로 다릅니다. 각 사이트를 참고하여 임의로 가장 적당하다고 생각되는 사례만 참고했습니다.

### Shared
shared layer는 다음과 같은 특징을 가집니다.
- **shared 내 파일은 특정 비즈니스 도메인에 절대 종속되어서는 안됩니다.** 따라서, **slice의 역할을 하는 폴더가 존재하지 않습니다.**
- slice가 없기 때문에 shared 내 폴더는 바로 segment가 되며 각 폴더끼리 공유가 가능합니다.
