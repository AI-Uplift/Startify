<script>
    import { plannerData } from '../store';
    import { executePlanner } from '../api';
  
    // You might have a method to call executePlanner when the user inputs a prompt
    function onNewPrompt(prompt) {
      executePlanner(prompt);
    }
  
    // This function would likely toggle the done status of a task
    function toggleTaskDone(step) {
      // Logic to toggle the task done state
    }
  </script>
  
  <div class="planner-widget">
    <h2>Project Planner</h2>
    <ul class="task-list">
      {#each $plannerData.plans as plan, step}
        <li class={`task-item ${plan.done ? 'done' : ''}`}>
          <label class="task-label">
            <input type="checkbox" class="task-checkbox" checked={plan.done} on:change={() => toggleTaskDone(step)} />
            Step {step}: {plan.description}
          </label>
        </li>
      {/each}
    </ul>
  </div>
  
  <style>
    .planner-widget {
      background: #1e293b;
      border-radius: 8px;
      padding: 1rem;
      color: #fff;
      max-width: 400px;
      margin: 0 auto;
    }
  
    .planner-widget h2 {
      text-align: center;
      margin-bottom: 1rem;
    }
  
    .task-list {
      list-style: none;
      padding: 0;
    }
  
    .task-item {
      background: #334155;
      margin-bottom: .5rem;
      padding: .5rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
  
    .task-item:hover {
      background: #475569;
    }
  
    .task-label {
      display: flex;
      align-items: center;
    }
  
    .task-checkbox {
      margin-right: .5rem;
    }
  
    .done {
      text-decoration: line-through;
      color: #94a3b8;
    }
  </style>
  