<script>
  import { onMount } from "svelte";
  import Sidebar from "./Sidebar.svelte";
  import ControlPanel from "./ControlPanel.svelte";
  import MessageContainer from "./MessageContainer.svelte";
  import InternalMonologue from "./InternalMonologue.svelte";
  import MessageInput from "./MessageInput.svelte";
  import TerminalWidget from "./TerminalWidget.svelte";
  import BrowserWidget from "./BrowserWidget.svelte";
  import PlannerWidget from "./PlannerWidget.svelte"; // Make sure to create this component
  let activeTab = 'shell'; // Default active tab
  
  // Dummy function to mimic API calls for the tabs
  async function fetchTabData(tab) {
    console.log(`Fetching data for ${tab}`);
    // This will integrate actual API calls
  }
  
  function switchTab(tab) {
    activeTab = tab;
    fetchTabData(tab);
  }
  
  onMount(() => {
    fetchTabData(activeTab); // Fetch data for the default active tab
  });

  import {
    fetchProjectList,
    fetchModelList,
    fetchAgentState,
    fetchMessages,
    checkInternetStatus,
  } from "../api";

  onMount(() => {
    localStorage.clear();
    const intervalId = setInterval(async () => {
      await fetchProjectList();
      await fetchModelList();
      await fetchAgentState();
      await fetchMessages();
      await checkInternetStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  });
</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex flex-col flex-1 p-4">
    <ControlPanel />
    <div class="flex h-full space-x-4">
      <div class="flex flex-col w-1/3">
        <MessageContainer />
        <InternalMonologue />
        <MessageInput />
      </div>
      <div class="flex flex-col flex-grow">
        <div class="workspace-container">
        <div class="tabs-header">
          <!-- Tab buttons -->
          <button on:click={() => switchTab('shell')} class="{activeTab === 'shell' ? 'active' : ''}">Shell</button>
          <button on:click={() => switchTab('browser')} class="{activeTab === 'browser' ? 'active' : ''}">Browser</button>
          <button on:click={() => switchTab('editor')} class="{activeTab === 'editor' ? 'active' : ''}">Editor</button>
          <button on:click={() => switchTab('planner')} class="{activeTab === 'planner' ? 'active' : ''}">Planner</button>
        </div>
        <div class="tab-content">
          <!-- Tab content -->
          {#if activeTab === 'shell'}
            <TerminalWidget />
          {:else if activeTab === 'browser'}
            <BrowserWidget />
          {:else if activeTab === 'planner'}
            <PlannerWidget /> <!-- Display the Planner component -->
          {:else}
            <div>Content for {activeTab}</div> <!-- Placeholder content for other tabs -->
          {/if}
        </div>
      </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Global styles are maintained */
  .workspace-container {
  /* Add explicit dimensions if the container might be collapsing */
  min-height: 400px; /* Adjust as necessary */
}

.tabs-header button.active {
  background-color: #333; /* Visible contrast color */
  color: white;
}

.tab-content {
  /* Ensure there's enough padding or content to see the area */
  padding: 20px;
  border: 1px solid #ccc; /* Visible border for debugging */
}
</style>
