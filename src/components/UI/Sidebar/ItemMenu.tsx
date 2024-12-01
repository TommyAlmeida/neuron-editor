import { useState } from "react";
import {
    MoreVertical,
    Edit2,
    Trash2,
    FolderPlus,
    FolderMinus
} from 'lucide-react';
import { useStore } from "../../../store/editorStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Group, Light, Object3D } from "../../../types/editor";

interface ItemMenuProps {
    item: Object3D | Light | Group;
}

export function ItemMenu({ item }: ItemMenuProps) {
    const {
        deleteObject,
        deleteLight,
        updateObject,
        updateLight,
        groups,
        moveItem
    } = useStore();

    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(item.name);

    const handleDelete = () => {
        if ('intensity' in item) {
            deleteLight(item.id.toString());
        } else {
            deleteObject(item.id.toString());
        }
    };

    const handleRename = () => {
        if ('intensity' in item) {
            updateLight(item.id.toString(), { name: newName });
        } else {
            updateObject(item.id.toString(), { name: newName });
        }
        setIsRenaming(false);
    };

    const handleRemoveFromGroup = () => {
        moveItem(item.id.toString(), null);
    };

    if (isRenaming) {
        return (
            <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename();
                    if (e.key === 'Escape') setIsRenaming(false);
                }}
                className="px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton
                className="p-1 text-gray-400 rounded-md"
                onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}
            >
                <MoreVertical className="w-4 h-4" />
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                    {({ disabled }) => (
                        <button
                            className={`${disabled ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } flex w-full items-center px-3 py-2 text-sm`}
                            onClick={() => setIsRenaming(true)}
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Rename
                        </button>
                    )}
                </MenuItem>

                <MenuItem>
                    {({ active }) => (
                        <Menu as="div" className="relative w-full">
                            <MenuButton
                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                    } flex w-full items-center px-3 py-2 text-sm`}
                            >
                                <FolderPlus className="w-4 h-4 mr-2" />
                                Move to Group
                            </MenuButton>

                            <MenuItems className="absolute left-full top-0 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {groups.map((group) => (
                                    <MenuItem key={group.id}>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                    } flex w-full items-center px-3 py-2 text-sm`}
                                                onClick={() => moveItem(item.id.toString(), group.id)}
                                            >
                                                {group.name}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>
                    )}
                </MenuItem>

                {item?.id && (
                    <MenuItem>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                    } flex w-full items-center px-3 py-2 text-sm`}
                                onClick={handleRemoveFromGroup}
                            >
                                <FolderMinus className="w-4 h-4 mr-2" />
                                Remove from Group
                            </button>
                        )}
                    </MenuItem>
                )}

                <MenuItem>
                    {({ active }) => (
                        <button
                            className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } flex w-full items-center px-3 py-2 text-sm text-red-600`}
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </button>
                    )}
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}