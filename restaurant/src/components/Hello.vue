<template>
  <div id="app">
    <div class="space10"></div>
    <v-container>
      <br><br>
        <v-card-title justify="center">
            <h2 class="homeTitle"> Mini Projet Restaurant M1 MIAGE </h2>
        </v-card-title>
    </v-container>
    <div class="parallax">
      <div class="caption">
        <span class="border" style="font-family: 'Anton'; letter-spacing: 10px;">
          SCROLL DOWN
        </span>
      </div>
    </div>
    <div style="color: #777;background-color:white;text-align:center;padding:50px 80px;text-align: justify; font-family: 'Bebas Neue';">
  <h3 style="text-align:center;">Parallax Demo</h3>
  <p>Parallax scrolling is a web site trend where the background content is moved at a different speed than the foreground content while scrolling. Nascetur per nec posuere turpis, lectus nec libero turpis nunc at, sed posuere mollis ullamcorper libero ante lectus, blandit pellentesque a, magna turpis est sapien duis blandit dignissim. Viverra interdum mi magna mi, morbi sociis. Condimentum dui ipsum consequat morbi, curabitur aliquam pede, nullam vitae eu placerat eget et vehicula. Varius quisque non molestie dolor, nunc nisl dapibus vestibulum at, sodales tincidunt mauris ullamcorper, dapibus pulvinar, in in neque risus odio. Accumsan fringilla vulputate at quibusdam sociis eleifend, aenean maecenas vulputate, non id vehicula lorem mattis, ratione interdum sociis ornare. Suscipit proin magna cras vel, non sit platea sit, maecenas ante augue etiam maecenas, porta porttitor placerat leo.</p>
</div>

  </div>
</template>


<script>
export default {
  name: 'Helloworld',
  data:() => ({
    
  })
};
</script>

<style>
.homeTitle {
  font-family: 'Anton'!important;
  margin: 0 auto!important;
  font-size: 35px;
}

.space10 {
  display: block;
  height: 100px;
}

.parallax {
  background-image: url("https://picsum.photos/1920/1080");

  height: 500px;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.caption {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: black;
}

.border {
    background-color: #111;
    color: #fff;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 10px
}
</style>