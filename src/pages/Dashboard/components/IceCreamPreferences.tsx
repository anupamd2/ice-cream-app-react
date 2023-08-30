import "./IceCreamPreferences.css";
import User from "../../../types/core/User";
import IceCreamPreference from "../../../types/core/IceCreamPreference";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useState } from "react";
import SortableIceCreamPreference from "./SortableIceCreamPreference";
import { useAppDispatch } from "../../../app/hooks";
import { saveUserInformation } from "../../../services/User/UserSlice";

interface IceCreamPreferencesProps {
  user: User;
}

function IceCreamPreferences({ user }: IceCreamPreferencesProps): JSX.Element {
  const [preferences, setPreferences] = useState<IceCreamPreference[]>([
    ...user.iceCreamPreferences,
  ]);
  const dispatch = useAppDispatch();
  const [ifChange, setIfChange] = useState(false);
  const [newFlavour, setNewFlavour] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = () => {
    setIfChange(true);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      handleChange();
      setPreferences((prevItems) => {
        const activeFlavour = active.id as string;
        const overFlavour = over.id as string;
        const activeIndex = prevItems.findIndex(
          (item) => item.flavour === activeFlavour
        );
        const overIndex = prevItems.findIndex(
          (item) => item.flavour === overFlavour
        );
        const newItems = [...arrayMove(prevItems, activeIndex, overIndex)];
        return newItems;
      });
    }
  };

  const handleNotesChange = (flavour: string, newNotes: string) => {
    setPreferences((prevItems) => {
      const newItems: IceCreamPreference[] = [];
      prevItems.forEach((item) => {
        if (item.flavour === flavour) {
          newItems.push({ ...item, notes: newNotes });
        } else {
          newItems.push(item);
        }
      });
      return newItems;
    });
  };

  function handleReset(): void {
    setIfChange(false);
    setPreferences(user.iceCreamPreferences);
  }

  function handleSave(): void {
    dispatch(
      saveUserInformation({
        username: user.username,
        iceCreamPreferences: preferences,
      })
    );
    setIfChange(false);
  }

  function handleAddFlavour(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    if (newFlavour === "") {
      setFormError("Please enter a flavour");
      return;
    }
    const match = preferences.find((item) => item.flavour === newFlavour);
    if (match) {
      setFormError("This flavour already exists");
      return;
    }
    setPreferences((prevItems) => {
      return [...prevItems, { flavour: newFlavour, notes: "" }];
    });
    setNewFlavour("");
    setFormError("");
    setIfChange(true);
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="ice-cream-preferences-container">
        <p className="title">Your Ice Cream Preferences</p>
        <p className="tutorial">
          Place cursor over the 6 dot icon, and drag and drop to reorder your
          ice cream preferences
        </p>
        <SortableContext
          items={preferences.map(
            (iceCreamPreference) => iceCreamPreference.flavour
          )}
          strategy={verticalListSortingStrategy}
        >
          <div className="ice-cream-preferences">
            {preferences.map((iceCreamPreference, index) => (
              <SortableIceCreamPreference
                key={iceCreamPreference.flavour}
                iceCreamPreference={iceCreamPreference}
                index={index}
                setPreferencesState={handleNotesChange}
                handleChange={handleChange}
              />
            ))}
          </div>
        </SortableContext>
        <form action="" className="addForm">
          <input
            type="text"
            className="notes"
            placeholder="Enter new flavour"
            value={newFlavour}
            onChange={(e) => setNewFlavour(e.target.value)}
          />
          <button className="btn add" onClick={handleAddFlavour}>
            Add
          </button>
        </form>
        {formError && (
          <div className="error-container add-form-error-container">
            <p className="error-message">{formError}</p>
          </div>
        )}
        {ifChange && (
          <div className="ice-cream-preferences-toolbar">
            <button className="btn reset" onClick={handleReset}>
              Reset
            </button>
            <button className="btn save" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </DndContext>
  );
}

export default IceCreamPreferences;
