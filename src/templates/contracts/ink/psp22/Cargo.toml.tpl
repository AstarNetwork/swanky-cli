[package]
name = "{{contract_name_snake}}"
version = "0.1.0"
authors = ["{{author_name}}"]
edition = "2021"

[dependencies]
ink_primitives = { version = "~3.3.0", default-features = false }
ink_metadata = { version = "~3.3.0", default-features = false, features = ["derive"], optional = true }
ink_env = { version = "~3.3.0", default-features = false }
ink_storage = { version = "~3.3.0", default-features = false }
ink_lang = { version = "~3.3.0", default-features = false }
ink_prelude = { version = "~3.3.0", default-features = false }
ink_engine = { version = "~3.3.0", default-features = false, optional = true }

scale = { package = "parity-scale-codec", version = "3", default-features = false, features = ["derive"] }
scale-info = { version = "2", default-features = false, features = ["derive"], optional = true }

# These dependencies
openbrush = { version = "~2.2.0", default-features = false, features = ["psp22"] }

[lib]
name = "{{contract_name_snake}}"
path = "src/lib.rs"
crate-type = [
    # Used for normal contract Wasm blobs.
    "cdylib",
]

[features]
default = ["std"]
std = [
    "ink_primitives/std",
    "ink_metadata",
    "ink_metadata/std",
    "ink_env/std",
    "ink_storage/std",
    "ink_lang/std",
    "scale/std",
    "scale-info",
    "scale-info/std",

    # These dependencies
    "openbrush/std",
]
ink-as-dependency = []

[profile.dev]
codegen-units = 16
