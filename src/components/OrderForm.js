import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [preparation, setPreparation] = useState("");
  const [numberField, setNumberField] = useState();
  const [diameter, setDiameter] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePreparation = (event) => {
    setPreparation(event.target.value);
  };

  const handleDishType = (event) => {
    const dish = dishes.find((dish) => dish.name === event.target.value);
    if (dish) {
      setType(dish);
    }
  };

  const handleNumOfSlices = (event) => {
    setNumberField(event.target.value);
  };

  const handleDiameter = (event) => {
    setDiameter(event.target.value);
  };

  const [dishes] = useState([
    {
      name: "pizza",
      field: (
        <div className="hidden-options">
          <label htmlFor="pizza">Number of slices</label>
          <input
            type="number"
            value={numberField}
            onChange={handleNumOfSlices}
            id="pizza"
            required
          />
          <label htmlFor="pizza">Diameter</label>
          <input
            type="number"
            value={diameter}
            onChange={handleDiameter}
            id="pizza"
            step="0.1"
            required
          />
        </div>
      ),
    },

    {
      name: "soup",
      field: (
        <div className="hidden-options">
          <label htmlFor="soup">Spiceness scale (1-10)</label>
          <input
            type="number"
            value={numberField}
            onChange={handleNumOfSlices}
            min="0"
            max="10"
            id="soup"
            required
          />
        </div>
      ),
    },

    {
      name: "sandwich",
      field: (
        <div className="hidden-options">
          <label htmlFor="sandwich">Slices of bread</label>
          <input
            value={numberField}
            onChange={handleNumOfSlices}
            type="number"
            id="sandwich"
            required
          />
        </div>
      ),
    },
  ]);

  const [type, setType] = useState(dishes[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const no_of_slices = numberField * 1;
    const diameterValue = diameter * 1.0;

    let obj = {
      id: uuidv4(),
      name,
      preparation_time: preparation,
      type: type.name,
      ...(type.name === "pizza" && { no_of_slices }),
      ...(type.name === "pizza" && { diameter: diameterValue }),
      ...(type.name === "soup" && { spiciness_scale: no_of_slices }),
      ...(type.name === "sandwich" && { slices_of_bread: no_of_slices }),
    };

    fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then(() => {
        toast.success("You've ordered an awesome dish!");
      })
      .catch((error) => {
        toast.error("Ooops! Something went wrong. Try again later.");
        console.log("Error", error);
      });
  };

  return (
    <div className="container">
      <h2>Order a dish</h2>
      <form onSubmit={handleSubmit}>
        <label>Dish name</label>
        <input type="text" required value={name} onChange={handleName} />
        <label>Preparation time</label>
        <input type="time" step="2" onChange={handlePreparation} required />

        <label>Type</label>
        <select onChange={handleDishType}>
          {dishes.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {type && type.field}
        <button>Add a dish</button>
      </form>
    </div>
  );
};

export default OrderForm;
