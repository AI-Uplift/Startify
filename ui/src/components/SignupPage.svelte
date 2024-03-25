<script>
    // Include any Svelte-specific logic here
  </script>
  
  <main class="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-6">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a9421aa13f5de3d04a02ec12ec0bc23147e93f21e07791ae6f02c9d9ced821b?apiKey=ec8bebbb80434aa6b3d08cb833f9a6f0&" alt="StartifyAI Logo" class="w-32 h-auto mb-8" />
        <h1 class="text-4xl font-semibold text-white">Signup</h1>
        <p class="text-lg text-stone-300">Create your account</p>
      </div>
  
      <div class="bg-slate-800 rounded-2xl p-8 backdrop-blur-md border border-slate-700">
        <form class="flex flex-col space-y-6">
          <!-- Name Input -->
          <input
            type="text"
            class="rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Name"
            aria-label="Full name"
          />
          <!-- Email Input -->
          <input
            type="email"
            class="rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Email address"
            aria-label="Email"
          />
          <!-- Username Input -->
          <input
            type="text"
            class="rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Username"
            aria-label="Username"
          />
          <!-- Section heading -->
          <div class="text-center text-stone-300">
            <h2 class="text-xl font-semibold">Finish setting up your account</h2>
            <p class="text-lg">Create your password and get started</p>
          </div>
          <!-- Password Input -->
          <input
            type="password"
            class="rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Password"
            aria-label="Password"
          />
          <!-- Confirm Password Input -->
          <input
            type="password"
            class="rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Confirm password"
            aria-label="Confirm Password"
          />
          <!-- Signup Button -->
          <button
            type="submit"
            class="w-full rounded-full bg-emerald-500 px-6 py-4 text-xl font-semibold text-white"
          >
            Signup
          </button>
        </form>
        <p class="mt-6 text-center text-stone-400">
          Already have an account?
          <a href="/login" class="text-emerald-500">Login</a>
        </p>
      </div>
    </div>
  </main>
  
  <style>
    /* If you need to add custom styles or override Tailwind styles, do it here */
  </style>
  