const AlphabetGrid = ({load}) => {
  const topRow = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const bottomRow = ["W", "X", "Y", "Z", "0-9"];

  const Key = ({ label, loadFunction }) => (
    <div onClick={loadFunction} className="flex h-12 w-12 items-center cursor-pointer justify-center rounded-xl bg-orange-200 font-semibold text-gray-900 shadow-sm">
      {label}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {/* A–V */}
      <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
        {topRow.map((char) => (
          <Key key={char} label={char} loadFunction={() => load(char)} />
        ))}
      </div>

      {/* W X Y Z 0-9 */}
      {/* <div className="flex gap-3">
        {bottomRow.map((char) => (
          <Key key={char} label={char} />
        ))}
      </div> */}
    </div>
  );
};

export default AlphabetGrid;