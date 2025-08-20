"use strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * Convo is a class that runs Model Context Protocol (MCP) server
 * with registered tools having node handler function and info metadata.
 */
class Convo {

  /**
   * Initialise MCP server and registers MCP tools.
   */
  constructor(name, version, tools, toolOpts) {

    // Callback function to handle Nestor action result.
    // It resolves or rejects the Promise based on the action result.
    // It formats the result into a content text that can be used in the response.
    function _actionCb(resolve, reject, resultText) {
      return (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            content: [{ type: 'text', text: resultText(result)}]
          });
        }
      };
    };

    this.server = new McpServer({
      name: name,
      version: version,
    });

    // Register each tool with its info and handler function.
    // The handler function is provided with toolOpts.
    // Any resource needed by the tool handler can be passed through toolOpts.
    tools.forEach(tool => {
      this.server.tool(
        tool.info.name,
        tool.info.description,
        tool.info.parameters,
        tool.handler(toolOpts, _actionCb)
      );
    });
  }

  /**
   * Run the MCP server.
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }

}

export {
  Convo as default
};
