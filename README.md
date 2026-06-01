# Heynear Mobile Prototype

Vite + React로 만든 모바일 웹 클릭형 프로토타입입니다. Figma에서 export한 PNG 화면을 모바일 브라우저에서 앱처럼 보여주고, 투명 hotspot 버튼을 눌러 화면을 전환하는 용도입니다.

## 실행 방법

```bash
npm install
npm run dev
```

빌드 확인은 아래 명령으로 할 수 있습니다.

```bash
npm run build
```

빌드 결과를 로컬에서 확인하려면 다음을 실행하세요.

```bash
npm run preview
```

## 이미지 넣는 위치

화면 PNG는 `public/screens/` 폴더에 넣습니다.

현재 앱은 아래 실제 이미지 파일명을 사용합니다.

1. `public/screens/phase_01.png`
2. `public/screens/phase_02.png`
3. `public/screens/phase_03.png`
4. `public/screens/phase_04.png`
5. `public/screens/phase_05.png`
6. `public/screens/phase_06.png`
7. `public/screens/phase_07.png`
8. `public/screens/phase_08.png`
9. `public/screens/phase_09.png`
10. `public/screens/phase_10.png`
11. `public/screens/phase_11.png`

PNG가 없거나 로딩에 실패하면 화면이 깨지는 대신 placeholder가 표시됩니다.

## Hotspot 수정 방법

Hotspot은 `src/App.jsx` 상단의 `HOTSPOTS` 배열에서 관리합니다.

```jsx
{
  screen: 'phase-01',
  label: '주요 CTA를 눌러 두 번째 화면으로 이동',
  top: 81,
  left: 9,
  width: 82,
  height: 8,
  target: 'phase-02',
}
```

- `screen`: hotspot이 올라갈 현재 화면 ID입니다.
- `label`: 접근성용 `aria-label`입니다. 화면에는 보이지 않습니다.
- `top`, `left`, `width`, `height`: 전체 PNG 프레임 기준 퍼센트 값입니다.
- `target`: 클릭 후 이동할 화면 ID입니다.

예를 들어 Figma에서 버튼이 화면 하단 중앙에 있고 전체 폭의 60%라면 다음처럼 조정할 수 있습니다.

```jsx
{ top: 80, left: 20, width: 60, height: 8, target: 'phase-02' }
```

퍼센트 기준이므로 모바일 화면이 375px보다 크게 확대되어도 hotspot 위치와 크기가 이미지에 맞춰 같이 확대됩니다.

## 화면 크기 정책

- 전체 앱 높이는 `100dvh`를 사용합니다.
- iOS safe area(`env(safe-area-inset-*)`)를 고려합니다.
- 모바일에서는 화면 너비에 맞춰 확대하고, 데스크톱에서는 최대 430px 너비의 모바일 프레임으로 중앙 정렬합니다.
- 화면이 낮은 기기에서는 PNG가 잘리지 않도록 사용 가능한 높이에 맞춰 프레임을 줄입니다.
