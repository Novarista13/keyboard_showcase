import useConfigurator from "../stores/useConfigurator";

export const BackgroundBlurred = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 bg-white bg-opacity-15 backdrop-blur-md shadow-md  p-3 rounded-lg">
      {children}
    </div>
  );
};

const Interface = () => {
  const {
    whiteKeyColor,
    setWhiteKeyColor,
    darkKeyColor,
    setDarkKeyColor,
    plateColor,
    setPlateColor,
  } = useConfigurator();

  return (
    <div className="p-16 h-screen flex flex-col justify-center items-end ">
      <div className="space-y-5 w-1/5">
        <p className="text-xs">Keyboard Configurator</p>
        <BackgroundBlurred>
          <label className="text-sm font-medium">White Key Color</label>
          <input
            type="color"
            className="rounded-lg border-2 border-white"
            value={whiteKeyColor}
            onChange={(e) => setWhiteKeyColor(e.target.value)}
          />
        </BackgroundBlurred>

        <BackgroundBlurred>
          <label className="text-sm font-medium">Dark Key Color</label>
          <input
            type="color"
            className="rounded-lg border-2 border-white"
            value={darkKeyColor}
            onChange={(e) => setDarkKeyColor(e.target.value)}
          />
        </BackgroundBlurred>

        <BackgroundBlurred>
          <label className="text-sm font-medium">Plate Color</label>
          <input
            type="color"
            className="rounded-lg border-2 border-white"
            value={plateColor}
            onChange={(e) => setPlateColor(e.target.value)}
          />
        </BackgroundBlurred>
      </div>
    </div>
  );
};

export default Interface;
