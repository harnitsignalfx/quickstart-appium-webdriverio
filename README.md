# Running Appium Tests on Sauce Labs Platform
...

## Important information
### Environment variables for Sauce Labs
The examples in this repository that can run on Sauce Labs use environment variables, make sure you've added the following

    # For Sauce Labs Real devices in the New UI
    export SAUCE_USERNAME=********
    export SAUCE_ACCESS_KEY=*******
    export LOC_LAT=latitude (37.39 default, Chinatown SF)
    export LOC_LON=longitude (-122.41 default, Chinatown SF)
    export SHOP_URL=RUM location (http://pmrum.o11ystore.com default)

 ### Docker image
For Real devices
harnit/mobilerum-qs:1.0

For Emulator
harnit/mobilerum-qs:2.0

### Demo app(s)

Default config.yaml for a cronjob

```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: appium-mobilerum-spain
spec:
  schedule: "*/2 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: mobilerum-spain
            image: harnit/mobilerum-qs:1.0
            imagePullPolicy: IfNotPresent
            env:
            - name: SAUCE_USERNAME
              value: ***
            - name: SAUCE_ACCESS_KEY
              value: ***
            - name: LOC_LAT
              value: "39.6"
            - name: LOC_LON
              value: "-122.41"
            - name: SHOP_URL
              value: http://pmrum2.o11ystore.com
          restartPolicy: OnFailure
```
