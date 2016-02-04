{
  "targets": [
    {
      "target_name": "ncmod",
      "sources": [ "ncmod.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    },
    {
      "target_name": "cmod",
      "sources": [ "cmod.cc" ]
    }
  ]
}
