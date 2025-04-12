// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterSIL",
    products: [
        .library(name: "TreeSitterSIL", targets: ["TreeSitterSIL"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterSIL",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterSILTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterSIL",
            ],
            path: "bindings/swift/TreeSitterSILTests"
        )
    ],
    cLanguageStandard: .c11
)
