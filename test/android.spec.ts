describe('Android App flow', () => {
  it('should be able to order a the first product in the list', async () => {
    // Wait for the catalog to be shown
    ////*[@content-desc="

    // Set Timeout to be 12s
    driver.setTimeouts('page load',12000);

    const LOC_LAT = process.env.LOC_LAT || '37.79'
    const LOC_LON = process.env.LOC_LON || '-122.41'
    // Location - Spain
    driver.setGeoLocation({latitude: LOC_LAT, longitude: LOC_LON, altitude: "10"});

    // Set location

    const SHOP_URL = process.env.SHOP_URL || 'http://pmrum.o11ystore.com'

    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText').setValue(SHOP_URL);
    await driver.hideKeyboard();

    // Submit location
    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button[1]').click();

    var randomElement = Math.floor(Math.random() * (5 - 1) + 1);

    var myElement = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.ScrollView/android.widget.RelativeLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout['+randomElement+']/android.widget.ImageView';

    console.log('Element Selection is : ',randomElement);
    console.log('Item is: ',myElement);
    // Select type writer
    await $(myElement).click();

    // Add to Cart
    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.Button').click();

    // Checkout
    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.Button').click();

    // Place Order


    // Make sure the button is available, if not then swipe
    await findElementBySwipe({
      element: await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.Button'),
      scrollableElement: await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.FrameLayout/android.widget.RelativeLayout'),
    });
    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.Button').click();


    // If bad shop url, then wait longer to get timeout
    if (SHOP_URL.indexOf('pmrum2') !== -1){
      console.log('Bad shop url entered, longer pause needed');
      await driver.pause(95750);
    }
    else {
      console.log('Good shop url entered, shorter pause needed',LOC_LAT, LOC_LON, SHOP_URL);
//      await driver.pause(2750);
    }

    // Check if order is complete

    await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.TextView[1]').waitForDisplayed();
    
    console.log('Completed Order');


  });
});

/**
 * Swipe over the screen based on coordinates
 */
async function swipe(from: { x: number; y: number }, to: { x: number; y: number },
) {
  await driver.performActions([
    {
      // a. Create the event
      type: 'pointer',
      id: 'finger1',
      parameters: {pointerType: 'touch'},
      actions: [
        // b. Move finger into start position
        {type: 'pointerMove', duration: 0, x: from.x, y: from.y},
        // c. Finger comes down into contact with screen
        {type: 'pointerDown', button: 0},
        // d. Pause for a little bit
        {type: 'pause', duration: 100},
        // e. Finger moves to end position
        //    We move our finger from the center of the element to the
        //    starting position of the element
        {type: 'pointerMove', duration: 1000, x: to.x, y: to.y},
        // f. Finger lets up, off the screen
        {type: 'pointerUp', button: 0},
      ],
    },
  ]);
  // Always wait 1 second for the swipe to be done
  await driver.pause(2000);
}

/**
 * Find elements based on a swipe from bottom to top within a certain scrollable element
 */
async function findElementBySwipe({element, maxScrolls = 5, scrollableElement}: {
  element: WebdriverIO.Element;
  maxScrolls?: number;
  scrollableElement: WebdriverIO.Element;
}): Promise<WebdriverIO.Element | undefined> {
  for (let i = 0; i < maxScrolls; i++) {
    // Check if it's displayed
    if (await element.isDisplayed()) {
      return element;
    }

    const {x, y, height, width} = await driver.getElementRect(
      scrollableElement.elementId,
    );
    const centerX = x + width / 2;
    const yStart = y + height * 0.9;
    const yEnd = y + height * 0.1;
    // Swipe
    await swipe({x: centerX, y: yStart}, {x: centerX, y: yEnd});
  }
}
