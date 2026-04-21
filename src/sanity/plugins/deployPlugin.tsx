import { definePlugin } from "sanity";
import { RocketIcon } from "@sanity/icons";
import { useEffect, useState } from "react";
import { useClient } from "sanity";

function DeployButton() {
  const client = useClient({ apiVersion: "2026-02-20" });
  const [isDeploying, setIsDeploying] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastDeployTime, setLastDeployTime] = useState<string | null>(null);

  useEffect(() => {
    // Check for changes since last deploy
    const checkForChanges = async () => {
      const storedDeployTime = localStorage.getItem("lastDeployTime");
      setLastDeployTime(storedDeployTime);

      if (!storedDeployTime) {
        setHasChanges(true);
        return;
      }

      // Query for documents updated since last deploy
      const query = `count(*[_updatedAt > $lastDeploy])`;
      const count = await client.fetch(query, {
        lastDeploy: storedDeployTime,
      });

      setHasChanges(count > 0);
    };

    checkForChanges();

    // Check every minute
    const interval = setInterval(checkForChanges, 60000);
    return () => clearInterval(interval);
  }, [client]);

  const handleDeploy = async () => {
    setIsDeploying(true);

    try {
      // Replace with your Cloudflare Pages deploy hook URL
      const deployHookUrl = import.meta.env.PUBLIC_CLOUDFLARE_DEPLOY_HOOK;

      if (!deployHookUrl) {
        alert("Deploy hook URL not configured. Add PUBLIC_CLOUDFLARE_DEPLOY_HOOK to your .env file");
        setIsDeploying(false);
        return;
      }

      const response = await fetch(deployHookUrl, {
        method: "POST",
        mode: "no-cors",
      });

      // With no-cors mode, we can't check response.ok, so we assume success
      const now = new Date().toISOString();
      localStorage.setItem("lastDeployTime", now);
      setLastDeployTime(now);
      setHasChanges(false);
      alert("Website was published succesfully! It may take a minute for changes to appear.");
    } catch (error) {
      console.error("Deploy error:", error);
      alert(`Deploy failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <button
      onClick={handleDeploy}
      disabled={isDeploying}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: hasChanges ? "#ff8e42" : "#556bfc",
      color: "white",
      cursor: isDeploying ? "not-allowed" : "pointer",
      fontSize: "14px",
      fontFamily: "system-ui",
      fontWeight: "500",
    }}
    >
      <RocketIcon />
      {isDeploying ? "Publishing..." : "Publish website"}
      {hasChanges && !isDeploying && (
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            position: "absolute",
            top: "4px",
            right: "4px",
          }}
        />
      )}
    </button>
  );
}

export const deployPlugin = definePlugin({
  name: "deploy-button",
  studio: {
    components: {
      navbar: (props) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "19px" }}>
            <DeployButton />
            {props.renderDefault(props)}
          </div>
        );
      },
    },
  },
});
