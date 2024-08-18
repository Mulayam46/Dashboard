import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, addWidget, removeWidget } from './store.js';
import dashboardData from './dashboardData.json'; // Assuming you placed the JSON file here
import "./Dashboard.css"

const Dashboard = () => {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(dashboardData.categories));
  }, [dispatch]);

  const handleAddWidget = (categoryId) => {
    const widgetName = prompt('Enter Widget Name:');
    const widgetText = prompt('Enter Widget Text:');
    const newWidget = {
      id: Date.now(),
      name: widgetName,
      text: widgetText
    };
    dispatch(addWidget({ categoryId, widget: newWidget }));
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  return (
    <div className="dashboard">
      {categories.map(category => (
        <div key={category.id} className="category">
          <h3>{category.name}</h3>
          <div className="widgets">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <h4>{widget.name}</h4>
                <p>{widget.text}</p>
                <button onClick={() => handleRemoveWidget(category.id, widget.id)}>Remove</button>
              </div>
            ))}
            <button onClick={() => handleAddWidget(category.id)}>+ Add Widget</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
