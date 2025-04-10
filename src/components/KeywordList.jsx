// src/components/KeywordList.jsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from '../hook/useTranslation';
import KeywordItems from './KeywordItems';

// SortableItem component to handle individual draggable items
const SortableItem = ({ id, keyword, index, isSortable, language, isEditable }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isSortable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Optional: Add visual feedback during drag
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="keyword-draggable"
    >
      <KeywordItems
        keyword={keyword}
        index={index}
        language={language}
        isEditable={isEditable}
      />
    </div>
  );
};

// Main KeywordList component
const KeywordList = ({ isEditable }) => {
  const { keywords, reorderKeywords, selectedLang } = useTranslation();

  // Set up sensors for drag-and-drop (mouse and keyboard support for accessibility)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require a small movement to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle the drag end event to reorder the keywords
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = keywords.findIndex((keyword) => keyword.id === active.id);
      const newIndex = keywords.findIndex((keyword) => keyword.id === over?.id);

      const newKeywords = [...keywords];
      const [moved] = newKeywords.splice(oldIndex, 1);
      newKeywords.splice(newIndex, 0, moved);
      reorderKeywords(newKeywords);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={keywords.map((keyword) => keyword.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="keyword-list">
          {keywords.map((keyword, index) => (
            <SortableItem
              key={keyword.id}
              id={keyword.id}
              keyword={keyword}
              index={index}
              isSortable={!isEditable} // Dragging is enabled only if editable
              language={selectedLang}
              isEditable={isEditable} // Pass isEditable to KeywordItems
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default KeywordList;