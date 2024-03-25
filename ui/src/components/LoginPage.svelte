<script>
    // Svelte script content (if any needed)
  </script>
  
  <section class="flex items-center justify-center min-h-screen bg-neutral-900 p-4">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-6">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a9421aa13f5de3d04a02ec12ec0bc23147e93f21e07791ae6f02c9d9ced821b?apiKey=ec8bebbb80434aa6b3d08cb833f9a6f0&" alt="StartifyAI Logo" class="w-32 h-auto mb-8" />
        <h1 class="text-4xl font-semibold text-white">Login</h1>
        <p class="text-lg text-stone-300">Welcome Back!</p>
      </div>
  
      <div class="bg-slate-800 rounded-2xl p-8 backdrop-blur-md border border-slate-700">
        <!-- Social Login Buttons -->
        <div class="flex justify-between mb-8">
          <button class="flex items-center justify-center px-4 py-2 bg-slate-600 rounded-xl text-white">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5689aff7cb5009e63807f12c5f9856eaa43f9dd1c4e1558217416be9e711644?apiKey=ec8bebbb80434aa6b3d08cb833f9a6f0&" alt="Google logo" class="w-6 h-6 mr-2" />
            Login with Google
          </button>
          <button class="flex items-center justify-center px-4 py-2 bg-slate-600 rounded-xl text-white">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e5914ab46f7819fb950c9dff59c8be5b848638d4320b380f80d1702c08ff09c?apiKey=ec8bebbb80434aa6b3d08cb833f9a6f0&" alt="GitHub logo" class="w-6 h-6 mr-2" />
            Login with GitHub
          </button>
        </div>
  
        <div class="flex items-center my-6">
          <hr class="flex-grow border-stone-600" />
          <span class="mx-4 text-stone-400">OR</span>
          <hr class="flex-grow border-stone-600" />
        </div>
  
        <!-- Email Input -->
        <div class="mb-6">
          <input
            type="email"
            class="w-full rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Email address"
          />
        </div>
  
        <!-- Password Input -->
        <div class="mb-6">
          <input
            type="password"
            class="w-full rounded-full px-6 py-4 bg-neutral-700 text-white border border-transparent focus:outline-none focus:border-emerald-500"
            placeholder="Password"
          />
        </div>
  
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center text-stone-400">
            <input type="checkbox" class="form-checkbox rounded text-emerald-500 bg-neutral-700 border-neutral-600 mr-2" />
            Remember me
          </label>
          <a href="#" class="text-emerald-500">Forgot your password?</a>
        </div>
  
        <!-- Login Button -->
        <button class="w-full rounded-full bg-emerald-500 px-6 py-4 text-xl font-semibold text-white">
          Login
        </button>
  
        <p class="mt-6 text-center text-stone-400">
          You don’t have an account yet?
          <a href="#" class="text-emerald-500">Signup</a>
        </p>
      </div>
    </div>
  </section>
  
  <style>
    /* You can add additional styles here if necessary */
  </style>
  