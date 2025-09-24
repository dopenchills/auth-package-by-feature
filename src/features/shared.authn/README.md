# 知りたいこと

- authn, authz, userの関係性
  - authn
    - input
      - credentials (id + password)
    - output
      - token
        - implicitly triggers token refresh / expiration
        - implicitly has `isLoggedIn`
    - events
      - LoggedIn
      - LoggedOut
  - user
    - input
      - userId
    - output
      - user
    - events
      - UserUpdated
