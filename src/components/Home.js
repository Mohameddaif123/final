import React from 'react';
import dogImage from '../images/dogtest.jpg';
import catImage from '../images/cattest.jpg';
import petsImage from '../images/pets3.webp';
import dogs1Image from '../images/dog2.webp';
import catsImage from '../images/cat1.jpg';
import cats1Image from '../images/petssup.jpeg';
import toy1Image from '../images/toy1.webp';
import cats3Image from '../images/cat3.jpg';
import dogs3Image from '../images/dog3.jpg';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <main>
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
          {/* Carousel indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          {/* Carousel items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={dogImage} alt="Dog" className="bd-placeholder-img" width="100%" height="100%" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>Dogs</h1>
                  <p className="opacity-75">Dogs, as pets, bring boundless joy and unwavering companionship into our lives, filling our days with love and laughter. With their loyal hearts and playful spirits, they enrich our homes and teach us the true meaning of unconditional love.</p>
                  <p><a className="btn btn-lg btn-primary" href="/Dogs">Learn more about our dogs </a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={catImage} alt="cat" className="bd-placeholder-img" width="100%" height="100%" />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Cats</h1>
                  <p>Cats, as cherished companions, exude an aura of mystery and grace, captivating us with their independent yet affectionate nature. Their soothing purrs and gentle presence bring tranquility to our homes, offering solace and companionship in moments both serene and spirited.</p>
                  <p><a className="btn btn-lg btn-primary" href="/Cats">Learn more about our cats</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={petsImage} alt="pets" className="bd-placeholder-img" width="100%" height="100%" />
              <div className="container">
                <div className="carousel-caption text-end">
                  <h1>Supplies</h1>
                  <p>for comfortable lifestyle for you pets try our best products .</p>
                  <p><a className="btn btn-lg btn-primary" href="/Products">the best product fo you pets lifestyle</a></p>
                </div>
              </div>
            </div>
          </div>
          {/* Carousel controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container marketing">
          {/* Three columns of text below the carousel */}
          <div className="row">
            <div className="col-lg-4">
              <img src={dogs3Image} alt="dog3.jpg" className="rounded-circle" width="140" height="140" aria-label="Placeholder" />
              <h2 className="fw-normal">Dogs</h2>
              <p>Everything Your Dog Desires in One Place</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <img src={cats3Image} alt="cat3.jpg" className="rounded-circle" width="140" height="140" role="img" aria-label="Placeholder" />
              <h2 className="fw-normal">Cats</h2>
              <p>Everything Your Cat Desires in One Place</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <img src={toy1Image} alt="toy1.webp" className="rounded-circle" width="140" height="140" role="img" aria-label="Placeholder" />
              <h2 className="fw-normal">Supplies</h2>
              <p>Elevating Your Pets Lifestyle with Superior Supplies</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
          </div>
          {/* START THE FEATURETTES */}
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">🐾 Our Dogs: Your Source for Tail-Wagging Happiness! 🐾 <span className="text-body-secondary">&quot;Tail-Wagging Wonders Await!&quot;</span></h2>
              <p className="lead">Discover the best in canine companionship at Our Dogs! With a handpicked selection of top-notch breeds, were committed to matching you with your perfect furry friend. From playful pals to loyal companions, find your ideal match with ease. Experience the joy of dog ownership with Our Dogs today! 🐶</p>
            </div>
            <div className="col-md-5">
              <img src={dogs1Image} alt="dog2" className="bd-placeholder-img" width="100%" height="100%" />
            </div>
          </div>
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">🐱 Our Cats: Purr-fect Companions Await! 🐱 <span className="text-body-secondary">&quot;Purr-fect Companions Await!&quot;</span></h2>
              <p className="lead">Welcome to Our Cats, your destination for feline companionship! Dive into our curated collection of fabulous felines and find the purr-fect match for your home. Whether youre seeking a snuggly lap cat or an adventurous explorer, weve got the ideal kitty companion just waiting to join your family. Embrace the love and warmth of cat ownership with Our Cats today! 🐾</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img src={catsImage} alt="cat1" className="bd-placeholder-img" width="100%" height="100%" />
            </div>
          </div>
          <hr className="featurette-divider"/>
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">Tail-Wagging Delights: Quality Supplies for Your Furry Friend <span className="text-body-secondary">Pamper Your Pet: Premium Supplies for Happy Tails</span></h2>
              <p className="lead">Indulge your furry friend with the finest pet supplies available at our store! From cozy beds and stylish accessories to nutritious treats and durable toys, we&apos;ve got everything your pet needs for a life of comfort and joy. With our carefully curated selection of premium products, you can ensure your pet&apos;s happiness and well-being every day. Shop now and treat your beloved companion to the love and care they deserve! 🐾
              </p>
            </div>
            <div className="col-md-5">
              <img src={cats1Image} alt="petssup" className="bd-placeholder-img" width="100%" height="100%" />
            </div>
          </div>
          <hr className="featurette-divider"/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

