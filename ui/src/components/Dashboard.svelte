<script>
  import { onMount } from "svelte";
  import Sidebar from "./Sidebar.svelte";
  import ControlPanel from "./ControlPanel.svelte";
  import MessageContainer from "./MessageContainer.svelte";
  import InternalMonologue from "./InternalMonologue.svelte";
  import MessageInput from "./MessageInput.svelte";
  import TerminalWidget from "./TerminalWidget.svelte";
  import BrowserWidget from "./BrowserWidget.svelte";
    let activeTab = 'shell'; // Default active tab
  
    // Dummy function to mimic API calls for the tabs
    async function fetchTabData(tab) {
      // Logic to fetch data based on `tab`
      // This will integrate actual API calls
    }
  
    function switchTab(tab) {
      activeTab = tab;
      fetchTabData(tab);
    }
  
    onMount(() => {
      fetchTabData(activeTab); // Fetch data for the default active tab
    });
  // import StartifyWorkspace from "./StartifyWorkspace.svelte"; // Re-enabled for the new workspace
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

    <div class="flex h-full">
      <!-- Maintaining the existing chat interface size -->
      <div class="flex flex-col w-1/3">
        <MessageContainer />
        <InternalMonologue />
        <MessageInput />
      </div>

      <!-- Inserting the StartifyWorkspace component -->
      <div class="flex flex-col flex-grow">
        <!-- <StartifyWorkspace /> -->
        <div class="workspace-container">
          <header class="tabs-header">
            <button on:click={() => switchTab('shell')} class="{activeTab === 'shell' ? 'active' : ''}">Shell</button>
            <button on:click={() => switchTab('browser')} class="{activeTab === 'browser' ? 'active' : ''}">Browser</button>
            <button on:click={() => switchTab('editor')} class="{activeTab === 'editor' ? 'active' : ''}">Editor</button>
            <button on:click={() => switchTab('planner')} class="{activeTab === 'planner' ? 'active' : ''}">Planner</button>
          </header>
          
          <div class="tab-content">
            {#if activeTab === 'shell'}
              <!-- Placeholder for Shell component -->
              <TerminalWidget />
            {:else if activeTab === 'browser'}
              <!-- Placeholder for Browser component -->
              <BrowserWidget />
            {:else}
              <!-- Placeholder content for Editor and Planner -->
              <div>Content for {activeTab}</div>
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
