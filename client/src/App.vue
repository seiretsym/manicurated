<template>
  <main>
    <header>
      <h1>Mani<span class="c-skyblue">Curate</span></h1>
    </header>
    <nav>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
    <footer>
      <h6>Copyright &copy; 2021</h6>
    </footer>
  </main>
</template>