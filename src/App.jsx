import { useEffect, useMemo, useState } from 'react';

const DESIGN_WIDTH = 750;
const DESIGN_HEIGHT = 1624;
const MAX_FRAME_WIDTH = 430;

const getFrameWidth = () => {
  if (typeof window === 'undefined') {
    return 375;
  }

  const viewportWidth = window.innerWidth || 375;
  const viewportHeight = window.visualViewport?.height || window.innerHeight || DESIGN_HEIGHT;

  return Math.floor(Math.min(viewportWidth, MAX_FRAME_WIDTH, (viewportHeight * DESIGN_WIDTH) / DESIGN_HEIGHT));
};

const SCREEN_IDS = Array.from({ length: 11 }, (_, index) => {
  return `phase-${String(index + 1).padStart(2, '0')}`;
});

const SCREEN_PATHS = Object.fromEntries(
  SCREEN_IDS.map((screenId) => [screenId, `/screens/${screenId.replace('-', '_')}.png`]),
);

// Hotspot coordinates are percentages of the full PNG frame.
// Adjust top/left/width/height below after checking the actual Figma button positions.
// Example: { top: 80, left: 20, width: 60, height: 8, target: 'phase-02' }
const HOTSPOTS = [
  {
    screen: 'phase-01',
    label: '주요 CTA를 눌러 두 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-02',
  },
  {
    screen: 'phase-02',
    label: '주요 CTA를 눌러 세 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-03',
  },
  {
    screen: 'phase-03',
    label: '주요 CTA를 눌러 네 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-04',
  },
  {
    screen: 'phase-04',
    label: '주요 CTA를 눌러 다섯 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-05',
  },
  {
    screen: 'phase-05',
    label: '주요 CTA를 눌러 여섯 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-06',
  },
  {
    screen: 'phase-06',
    label: '주요 CTA를 눌러 일곱 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-07',
  },
  {
    screen: 'phase-07',
    label: '주요 CTA를 눌러 여덟 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-08',
  },
  {
    screen: 'phase-08',
    label: '주요 CTA를 눌러 아홉 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-09',
  },
  {
    screen: 'phase-09',
    label: '주요 CTA를 눌러 열 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-10',
  },
  {
    screen: 'phase-10',
    label: '주요 CTA를 눌러 열한 번째 화면으로 이동',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-11',
  },
  {
    screen: 'phase-11',
    label: '완료 CTA를 눌러 첫 번째 화면으로 돌아가기',
    top: 81,
    left: 9,
    width: 82,
    height: 8,
    target: 'phase-01',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREEN_IDS[0]);
  const [frameWidth, setFrameWidth] = useState(getFrameWidth);
  const [failedScreens, setFailedScreens] = useState(() => new Set());

  useEffect(() => {
    const updateFrameWidth = () => setFrameWidth(getFrameWidth());

    updateFrameWidth();
    window.addEventListener('resize', updateFrameWidth);
    window.visualViewport?.addEventListener('resize', updateFrameWidth);

    return () => {
      window.removeEventListener('resize', updateFrameWidth);
      window.visualViewport?.removeEventListener('resize', updateFrameWidth);
    };
  }, []);

  const currentHotspots = useMemo(() => {
    return HOTSPOTS.filter((hotspot) => hotspot.screen === currentScreen);
  }, [currentScreen]);

  const currentIndex = SCREEN_IDS.indexOf(currentScreen) + 1;
  const imageFailed = failedScreens.has(currentScreen);

  const handleImageError = () => {
    setFailedScreens((previousFailedScreens) => {
      const nextFailedScreens = new Set(previousFailedScreens);
      nextFailedScreens.add(currentScreen);
      return nextFailedScreens;
    });
  };

  return (
    <main className="app-shell" aria-label="Heynear 모바일 클릭형 프로토타입">
      <section
        className="phone-frame"
        aria-label={`${currentIndex}번째 프로토타입 화면`}
        style={{ '--frame-width': `${frameWidth}px` }}
      >
        {!imageFailed && (
          <img
            className="screen-image"
            src={SCREEN_PATHS[currentScreen]}
            alt=""
            draggable="false"
            onError={handleImageError}
          />
        )}

        {imageFailed && (
          <div className="screen-placeholder" role="img" aria-label={`${currentScreen}.png 이미지를 불러오지 못했습니다.`}>
            <strong>{currentScreen}.png</strong>
            <span>public/screens 폴더에 PNG를 추가하거나 파일명을 확인해주세요.</span>
          </div>
        )}

        <div className="hotspot-layer" aria-label="클릭 가능한 영역">
          {currentHotspots.map((hotspot) => (
            <button
              className="hotspot-button"
              key={`${hotspot.screen}-${hotspot.target}-${hotspot.label}`}
              type="button"
              aria-label={hotspot.label}
              style={{
                top: `${hotspot.top}%`,
                left: `${hotspot.left}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              }}
              onClick={() => setCurrentScreen(hotspot.target)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
