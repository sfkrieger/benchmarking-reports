{
  "targets": [
    {
      "target_name": "nadd",
      "sources": [ "nadd.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    },
    {
      "target_name": "add",
      "sources": [ "add.cc" ]
    }
  ]
}
