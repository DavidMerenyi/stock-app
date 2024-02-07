Example React Native Expo app with graphql and postgresql using StepZen and NeonDB connected to Twelvedata API.

This is result of following up the notJustDev tut.

Need to add API config file (api/config.yaml) like follow: 

```configurationset:
  - configuration:
      name: postgresql_config
      uri: postgresql://ep-shrill-...
  - configuration:
      name: twelvedata
      Authorization: apikey a8b...
```
