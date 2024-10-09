import useConfigurator from "../stores/useConfigurator";

export const BackgroundBlurred = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 bg-white bg-opacity-15 backdrop-blur-md shadow-md  p-3 rounded-lg">
      {children}
    </div>
  );
};

const Interface = ({ aspectRatio }) => {
  const {
    whiteKeyColor,
    setWhiteKeyColor,
    darkKeyColor,
    setDarkKeyColor,
    plateColor,
    setPlateColor,
  } = useConfigurator();

  return (
    <div
      className={`p-16 h-screen flex ${
        aspectRatio < 1 ? "flex-row justify-end items-end" : "flex-col justify-center items-end"
      }`}
    >
      <div
        className={`space-y-5 flex flex-col justify-center w-1/5 ${
          aspectRatio < 1 ? "w-full max-h-[20%] items-center" : ""
        }`}
      >
        <p className="text-xs">Keyboard Configurator</p>
        <div className={`flex ${aspectRatio < 1 ? "flex-row space-x-5" : "flex-col space-y-5"}`}>
          <BackgroundBlurred>
            <label className={`font-medium ${aspectRatio < 1 ? "text-xs text-center" : "text-sm"}`}>
              White Key Color
            </label>
            <input
              type="color"
              className="rounded-lg border-2 border-white cursor-pointer"
              value={whiteKeyColor}
              onChange={(e) => setWhiteKeyColor(e.target.value)}
            />
          </BackgroundBlurred>

          <BackgroundBlurred>
            <label className={`font-medium ${aspectRatio < 1 ? "text-xs text-center" : "text-sm"}`}>
              Dark Key Color
            </label>
            <input
              type="color"
              className="rounded-lg border-2 border-white cursor-pointer"
              value={darkKeyColor}
              onChange={(e) => setDarkKeyColor(e.target.value)}
            />
          </BackgroundBlurred>

          <BackgroundBlurred>
            <label className={`font-medium ${aspectRatio < 1 ? "text-xs text-center" : "text-sm"}`}>
              Plate Color
            </label>
            <input
              type="color"
              className="rounded-lg border-2 border-white cursor-pointer"
              value={plateColor}
              onChange={(e) => setPlateColor(e.target.value)}
            />
          </BackgroundBlurred>
        </div>
      </div>
    </div>
  );
};

export default Interface;
