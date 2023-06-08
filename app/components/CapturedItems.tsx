import { CapturedPieces } from "@component/definitions";
import { PIECES, params } from "@component/utils";

type Props = {
  type: params;
  capturedPieces: CapturedPieces;
};
const CapturedItems = (props: Props) => {
  const { type, capturedPieces } = props;
  const pieceType = type === params.black ? "black" : "white";

  return (
    <div className=" my-10 px-10 hidden lg:block">
      <h4 className="uppercase text-sm text-center">
        {capturedPieces[pieceType].length
          ? `Captured ${pieceType} piece(s)`
          : `No ${pieceType} piece(s) captured`}
      </h4>
      <div className="text-5xl flex justify-center items-center flex-wrap">
        {capturedPieces[pieceType].map((piece, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: PIECES[piece] }}></p>
        ))}
      </div>
    </div>
  );
};

export default CapturedItems;
