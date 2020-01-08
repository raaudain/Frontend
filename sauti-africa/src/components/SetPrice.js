import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
    color: "",
    code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [colorToAdd, setColorToAdd] = useState(initialColor);

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const getData = () => {
        axiosWithAuth()
            .get('/colors')
            .then(res => {
                updateColors(res.data);
            })
            .catch(err => console.log(err));
    }
    const saveEdit = e => {
        e.preventDefault();
        const id = colorToEdit.id;
        axiosWithAuth()
            .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
            .then(res => {
                setEditing(false);
            })
            .catch(err => console.log(err));
        getData();
    };

    const deleteColor = color => {
        const id = color.id;
        axiosWithAuth()
            .delete(`http://localhost:5000/api/colors/${id}`)
            .then(res => {
                console.log(colorToAdd.color);
            })
            .catch(err => console.log(err));
        getData();
    };

    const addColor = () => {
        axiosWithAuth()
            .post('/colors', colorToAdd)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        getData();
    };

    const handleChangesColor = e => {
        setColorToAdd({ ...colorToAdd, color: e.target.value });
    };

    const handleChangesHex = e => {
        setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } });
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span className="delete" onClick={e => {
                                e.stopPropagation();
                                deleteColor(color)
                            }
                            }>
                                x
                            </span>{" "}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToEdit({ ...colorToEdit, color: e.target.value })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                       <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value }
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}
            <div className="spacer" />
            <input
                className="input"
                type="text"
                name="color"
                value={colorToAdd.color}
                placeholder="Color"
                onChange={handleChangesColor}
            />
            <input
                className="input"
                type="text"
                name="hex"
                value={colorToAdd.code.hex}
                placeholder="Hex"
                onChange={handleChangesHex}
            />
            <button onClick={() => {
                addColor();
                setColorToAdd(initialColor);
            }}>
                Add Color
                </button>
        </div>
    );
};

export default ColorList;