import * as application from "tns-core-modules/application";

export class VersionNumber {
    get() {
        let PackageManager = android.content.pm.PackageManager;
        let pkg = application.android.context.getPackageManager().getPackageInfo(application.android.context.getPackageName(),
            PackageManager.GET_META_DATA);
        return pkg.versionName;
    }
}