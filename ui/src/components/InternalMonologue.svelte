<script>
  import { agentState } from "../store";
</script>

<div
  class="internal-monologue bg-slate-950 border border-indigo-700 p-2 rounded mt-4 flex items-start space-x-3"
>
  <img
    src="/assets/StartifyAI-avatar.png"
    alt="StartifyAI's Avatar"
    class="avatar rounded-full flex-shrink-0"
  />
  <div>
    <p class="text-xs text-gray-400">StartifyAI's Internal Monologue</p>
    <p class="text-sm">{$agentState?.internal_monologue || "😴"}</p>
  </div>
</div>

<style>
  .avatar {
    width: 40px;
    height: 40px;
  }
</style>
