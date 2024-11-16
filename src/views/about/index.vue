<template>
  <div class="app-container">
    <div class="container winnie-about mt-5 px-3 px-lg-0">
        <div class="container content">
          <h1 class="mb-3 fw-bold d-inline d-md-none">About Tyche1.com</h1>
            <div id="aboutTyche1" class="mb-5">
            <h1 class="fw-bold d-none d-md-inline">About Tyche1.com</h1>
            <p class="mt-3">Welcome to a new frontier of on-chain gaming. <br>Tyche1 Games exists for one reason only: <span class="winnie-color-white fw-bold">One Dollar One Life.</span></p>
            <p class="mt-3">A high-stakes, winner-takes-all battle royale. In Tyche1, players add crypto to a prize pool; the more they add, the greater their chances of winning rewards.</p>
            <p class="mt-3">Tyche1.com leverages <a href="https://chain.link/vrf">Chainlink VRF</a> to ensure randomness, guaranteeing that results are always transparent and provably fair.</p>
            </div>

            <h1 class="mb-3 fw-bold d-inline d-md-none">Troubleshooting Guide</h1>
            <div id="aboutTyche1" class="mt-1 mb-5 mt-md-5">
            <h1 class="fw-bold d-none d-md-inline">Troubleshooting Guide</h1>
            <p class="mt-3 mb-0 winnie-color-white fw-bold fs-3">My various display errors</p>
            <p class="mt-1">Most of the time, random errors can be solved by following these steps:</p>
            <p class="mt-3">1. Clear your browser cache<br>2. Refresh the page and try again</p>
            <p class="mt-3">If you’ve tried these steps and are still encountering issues, please be sure to email us at <a href="mailto:support@tyche1.com">support@tyche1.com</a> to let us know.</p>
            <p class="mt-3 mb-0 winnie-color-white fw-bold fs-3">My issue isn't listed here</p>
            <p class="mt-1">Please email us at <a href="mailto:support@tyche1.com">support@tyche1.com</a>.</p>
            </div>
        </div>
    </div> 
  </div>
</template>

<script setup></script>

<style scoped>
  .app-container {
    min-height: 77vh;
    display: flex;
    flex-direction: column;
  }

  #aboutTyche1 p{
    letter-spacing: 0.3px;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  #aboutTyche1 a {
    color: #FCD535;
  }

  #aboutTyche1 a:hover {
    color: #ffcc00;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .winnie-about.container {
        width: 80%;
    }
  }
  @media (min-width: 991.98px) and (max-width: 1199.98px) {
    .winnie-about.container {
        width: 70%;
    }
  }
  @media (min-width: 768px) and (max-width: 1699.98px) {
    .winnie-about .side-nav {
        left: 80px;
    }
  }

  .winnie-about .accordion {
    --bs-accordion-btn-bg: transparent;
    --bs-accordion-bg: transparent;
    --bs-accordion-color: #F8F8F8;
    --bs-accordion-btn-color: #F8F8F8;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: none;
    --bs-accordion-border-color: transparent;
  }

  .winnie-about .accordion a {
    color: #F8F8F8;;
  }

  .winnie-about .accordion-button:not(.collapsed){
    color: #F8F8F8;
  }

  .winnie-about .fa-list {
    color: #F8F8F8;
  }

  .winnie-about .side-nav a {
    border-right: 1px solid #F8F8F8;
}

.winnie-about .side-nav a:hover,
.winnie-about .side-nav a:focus {
  border-right: 3px solid #FCD535;
}

.winnie-about .accordion-body ul {
    border-right: 1px solid #F8F8F8;
}

.winnie-about .accordion-body li:hover,
.winnie-about .accordion-body li:focus {
  border-right: 3px solid #FCD535;
}

.winnie-about .accordion-body li:hover a,
.winnie-about .accordion-body li:focus a {
  color: #FCD535;
}

.winnie-about p {
  color: #bbb;
}

.winnie-about .winnie-color-white {
  color: #F8F8F8;
}
</style>
