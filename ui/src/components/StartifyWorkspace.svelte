<script>
    // Import the Terminal and Browser components
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
  </script>
  
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
  
  <style>
  .workspace-container {
  /* Add explicit dimensions if the container might be collapsing */
  min-height: 700px; /* Adjust as necessary */
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
  