import { useSortable } from "@dnd-kit/sortable";
import IceCreamPreference from "../../../types/core/IceCreamPreference";
import { CSS } from "@dnd-kit/utilities";
import IceCreamImage from "./IceCreamImage";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeEvent } from "react";
import dragIcon from "../../../assets/drag.png";

interface IceCreamPreferenceProps {
  iceCreamPreference: IceCreamPreference;
  index: number;
  setPreferencesState: (flavour: string, newNotes: string) => void;
  handleChange: () => void;
}

function SortableIceCreamPreference({
  iceCreamPreference,
  index,
  setPreferencesState,
  handleChange,
}: IceCreamPreferenceProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: iceCreamPreference.flavour });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange();
    setPreferencesState(iceCreamPreference.flavour, event.target.value);
  };

  return (
    <div className="ice-cream-preference" ref={setNodeRef} style={style}>
      <div className="vertical-center-div">
        <p className="pm-0">{index + 1}</p>
      </div>
      <IceCreamImage flavour={iceCreamPreference.flavour} />
      <div className="details-container">
        <p className="pm-0 flavour-title">{iceCreamPreference.flavour}</p>
        <TextareaAutosize
          wrap="soft"
          name="notes"
          id="notes"
          className="notes"
          placeholder="Write some notes here..."
          value={iceCreamPreference.notes}
          onChange={handleNotesChange}
        />
      </div>
      <div className="vertical-center-div">
        <img
          src={dragIcon}
          alt="drag icon"
          className="drag-icon"
          {...attributes}
          {...listeners}
        />
      </div>
    </div>
  );
}

export default SortableIceCreamPreference;
