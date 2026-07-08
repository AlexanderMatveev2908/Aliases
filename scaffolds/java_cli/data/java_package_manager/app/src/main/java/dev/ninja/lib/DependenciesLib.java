package dev.ninja.lib;

import java.nio.file.Path;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class DependenciesLib {

  public static Element findDependency(
      Element dependencies,
      String targetGroup,
      String targetArtifact) {

    NodeList deps = dependencies.getElementsByTagName("dependency");

    for (int i = 0; i < deps.getLength(); i++) {
      Element dep = (Element) deps.item(i);

      String group = dep.getElementsByTagName("groupId")
          .item(0)
          .getTextContent();

      String artifact = dep.getElementsByTagName("artifactId")
          .item(0)
          .getTextContent();

      if (group.equals(targetGroup) &&
          artifact.equals(targetArtifact)) {
        return dep;
      }
    }

    return null;
  }

  public static void addDependency(
      Document document,
      Element dependencies,
      Arguments data) {

    Element dependency = document.createElement("dependency");

    Element groupId = document.createElement("groupId");
    groupId.setTextContent(data.getGroup());

    Element artifactId = document.createElement("artifactId");
    artifactId.setTextContent(data.getArtifact());

    dependency.appendChild(groupId);
    dependency.appendChild(artifactId);

    String version = data.getVersion();
    if (version != null) {
      Element versionTag = document.createElement("version");
      versionTag.setTextContent(version);
      dependency.appendChild(versionTag);
    }

    String scope = data.getScope();
    Element scopeElement = document.createElement("scope");
    String scopeTextContent = getScopeTextContent(scope);
    scopeElement.setTextContent(scopeTextContent);

    dependencies.appendChild(dependency);
  }

  public static String getScopeTextContent(String scope) {
    String textContent = switch (scope.toLowerCase()) {
      case "c", "compile" -> "compile";
      case "p", "provided" -> "provided";
      case "r", "runtime" -> "runtime";
      case "t", "test" -> "test";
      case "s", "system" -> "system";
      case "i", "import" -> "import";
      case "", "d", "default" -> "compile";
      default -> throw new IllegalArgumentException(
          "Unknown scope: " + scope);
    };

    return textContent;
  }

  public static void removeDependency(
      Element dependencies,
      Element dependency) {

    dependencies.removeChild(dependency);
  }

  public static void save(Document document, Path path) throws Exception {

    Transformer transformer = TransformerFactory.newInstance().newTransformer();

    transformer.setOutputProperty(OutputKeys.INDENT, "yes");

    transformer.transform(
        new DOMSource(document),
        new StreamResult(path.toFile()));
  }

  public static void removeWhitespace(Node node) {
    NodeList children = node.getChildNodes();

    for (int i = children.getLength() - 1; i >= 0; i--) {
      Node child = children.item(i);

      if (child.getNodeType() == Node.TEXT_NODE &&
          child.getTextContent().trim().isEmpty()) {

        node.removeChild(child);
      } else {
        removeWhitespace(child);
      }
    }
  }

  public static void printDependencies(NodeList deps) {
    for (int i = 0; i < deps.getLength(); i++) {
      Element dep = (Element) deps.item(i);

      String groupId = dep.getElementsByTagName("groupId")
          .item(0)
          .getTextContent();

      String artifactId = dep.getElementsByTagName("artifactId")
          .item(0)
          .getTextContent();

      Node versionNode = dep.getElementsByTagName("version").item(0);
      String version = versionNode != null
          ? versionNode.getTextContent()
          : "(managed/no version)";

      System.out.printf(
          "groupId=%s, artifactId=%s, version=%s%n",
          groupId, artifactId, version);
    }
  }
}
